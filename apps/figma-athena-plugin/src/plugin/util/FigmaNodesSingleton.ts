import { createRandom } from './createRandomId';

/**
 * Singleton to store global state for tracking the references to selected FigmaNodes in the Figma UI
 */
export class FigmaNodesSingleton {
  private static instance: FigmaNodesSingleton;

  private nodeReferences: Record<string, SceneNode> = {};

  public static getInstance(): FigmaNodesSingleton {
    if (!FigmaNodesSingleton.instance) {
      FigmaNodesSingleton.instance = new FigmaNodesSingleton();
    }
    return FigmaNodesSingleton.instance;
  }

  public getNodeReference(id: string) {
    return this.nodeReferences[id];
  }

  public resetReferences() {
    this.nodeReferences = {};
  }

  public addNodeReference(node: SceneNode) {
    const id = createRandom();
    this.nodeReferences[id] = node;
    return id;
  }
}
