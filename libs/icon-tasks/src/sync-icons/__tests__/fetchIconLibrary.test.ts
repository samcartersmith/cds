import * as getFileComponentSetsModule from '@cbhq/figma-api/getFileComponentSets';
import * as getFileImagesModule from '@cbhq/figma-api/getFileImages';
import * as getFileNodesModule from '@cbhq/figma-api/getFileNodes';

import { fetchIconLibrary } from '../fetchIconLibrary';

// Load fixtures
const componentSetsFixture = require('./__fixtures__/getFileComponentSets.json');
const nodesFixture = require('./__fixtures__/getFileNodes.json');
const imagesFixture = require('./__fixtures__/getFileImages.json');

// Mock the Figma API modules
jest.mock('@cbhq/figma-api/getFileComponentSets');
jest.mock('@cbhq/figma-api/getFileNodes');
jest.mock('@cbhq/figma-api/getFileImages');

const mockGetFileComponentSets = getFileComponentSetsModule.getFileComponentSets as jest.Mock;
const mockGetFileNodes = getFileNodesModule.getFileNodes as jest.Mock;
const mockGetFileImages = getFileImagesModule.getFileImages as jest.Mock;

describe('fetchIconLibrary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetFileComponentSets.mockResolvedValue(componentSetsFixture);
    mockGetFileNodes.mockResolvedValue(nodesFixture);
    mockGetFileImages.mockResolvedValue(imagesFixture);
  });

  describe('SyncedLibrary structure', () => {
    it('returns an object with remoteIds, recentlyUpdatedIds, nodes, and imageUrls', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      expect(result).toHaveProperty('remoteIds');
      expect(result).toHaveProperty('recentlyUpdatedIds');
      expect(result).toHaveProperty('nodes');
      expect(result).toHaveProperty('imageUrls');
    });

    it('returns SVG image format bucket in imageUrls', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      expect(result.imageUrls).toHaveProperty('svg');
    });
  });

  describe('remoteIds behavior', () => {
    it('returns remoteIds for all component sets in the file', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      expect(result.remoteIds).toBeInstanceOf(Array);
      expect(result.remoteIds.length).toBe(componentSetsFixture.meta.component_sets.length);

      // All component set node_ids should be in remoteIds
      componentSetsFixture.meta.component_sets.forEach((cs: { node_id: string }) => {
        expect(result.remoteIds).toContain(cs.node_id);
      });
    });
  });

  describe('recentlyUpdatedIds behavior', () => {
    it('returns all remoteIds as recentlyUpdatedIds when lastUpdated is undefined', async () => {
      const result = await fetchIconLibrary({
        fileId: 'test-icons-file',
        lastUpdated: undefined,
      });

      expect(result.recentlyUpdatedIds).toEqual(result.remoteIds);
    });

    it('filters recentlyUpdatedIds based on lastUpdated timestamp', async () => {
      const result = await fetchIconLibrary({
        fileId: 'test-icons-file',
        lastUpdated: '2025-01-01T00:00:00.000Z',
      });

      // recentlyUpdatedIds should be a subset of remoteIds
      result.recentlyUpdatedIds.forEach((id) => {
        expect(result.remoteIds).toContain(id);
      });

      // Should filter based on the date
      expect(result.recentlyUpdatedIds.length).toBeLessThanOrEqual(result.remoteIds.length);
    });

    it('recentlyUpdatedIds is always a subset of remoteIds', async () => {
      const result = await fetchIconLibrary({
        fileId: 'test-file',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      });

      result.recentlyUpdatedIds.forEach((id) => {
        expect(result.remoteIds).toContain(id);
      });
    });
  });

  describe('nodes behavior', () => {
    it('returns nodes with COMPONENT_SET document type', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      Object.values(result.nodes).forEach((node) => {
        expect(node.document).toBeDefined();
        expect(node.document.type).toBe('COMPONENT_SET');
      });
    });

    it('returns nodes with required document fields', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      Object.values(result.nodes).forEach((node) => {
        expect(node.document.id).toBeDefined();
        expect(node.document.name).toBeDefined();
        expect('children' in node.document && node.document.children).toBeInstanceOf(Array);
      });
    });

    it('returns nodes with metadata containing required fields', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      Object.entries(result.nodes).forEach(([nodeId, node]) => {
        expect(node.metadata).toBeDefined();
        expect(node.metadata.updated_at).toBeDefined();
        expect(node.metadata.created_at).toBeDefined();
        expect(typeof node.metadata.description).toBe('string');
        expect(node.metadata.node_id).toBe(nodeId);
      });
    });

    it('nodes object only contains keys from recentlyUpdatedIds', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-file' });

      const nodeKeys = Object.keys(result.nodes);
      nodeKeys.forEach((key) => {
        expect(result.recentlyUpdatedIds).toContain(key);
      });
    });
  });

  describe('imageUrls behavior', () => {
    it('returns imageUrls for child components, not component sets', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      // Component set IDs should NOT be in imageUrls.svg
      const componentSetIds = Object.keys(result.nodes);
      componentSetIds.forEach((setId) => {
        expect(result.imageUrls.svg[setId]).toBeUndefined();
      });

      // Child component IDs SHOULD be in imageUrls.svg
      const childIds: string[] = [];
      Object.values(result.nodes).forEach((node) => {
        if ('children' in node.document && node.document.children) {
          const children = node.document.children as readonly { id: string }[];
          children.forEach((child) => childIds.push(child.id));
        }
      });
      expect(childIds.length).toBeGreaterThan(0);
      childIds.forEach((childId) => {
        expect(result.imageUrls.svg[childId]).toBeDefined();
        expect(result.imageUrls.svg[childId]).toMatch(/^https:\/\//);
      });
    });
  });

  describe('edge cases', () => {
    it('returns empty nodes and imageUrls when lastUpdated is in the far future', async () => {
      const result = await fetchIconLibrary({
        fileId: 'test-icons-file',
        lastUpdated: '2099-01-01T00:00:00.000Z',
      });

      // remoteIds should still contain all items
      expect(result.remoteIds.length).toBe(componentSetsFixture.meta.component_sets.length);

      // But recentlyUpdatedIds should be empty
      expect(result.recentlyUpdatedIds).toEqual([]);

      // Nodes and imageUrls should be empty since nothing was updated
      expect(Object.keys(result.nodes)).toHaveLength(0);
      expect(Object.keys(result.imageUrls.svg)).toHaveLength(0);
    });

    it('treats empty string lastUpdated the same as undefined', async () => {
      const resultWithUndefined = await fetchIconLibrary({
        fileId: 'test-icons-file',
        lastUpdated: undefined,
      });

      jest.clearAllMocks();
      mockGetFileComponentSets.mockResolvedValue(componentSetsFixture);
      mockGetFileNodes.mockResolvedValue(nodesFixture);
      mockGetFileImages.mockResolvedValue(imagesFixture);

      const resultWithEmptyString = await fetchIconLibrary({
        fileId: 'test-icons-file',
        lastUpdated: '',
      });

      expect(resultWithEmptyString.recentlyUpdatedIds).toEqual(
        resultWithUndefined.recentlyUpdatedIds,
      );
      expect(resultWithEmptyString.remoteIds).toEqual(resultWithUndefined.remoteIds);
    });

    it('preserves essential metadata fields from component sets', async () => {
      const result = await fetchIconLibrary({ fileId: 'test-icons-file' });

      Object.values(result.nodes).forEach((node) => {
        expect(node.metadata).toHaveProperty('key');
        expect(node.metadata).toHaveProperty('file_key');
        expect(node.metadata).toHaveProperty('name');
        expect(node.metadata).toHaveProperty('containing_frame');
        expect(typeof node.metadata.description).toBe('string');
      });
    });
  });
});
