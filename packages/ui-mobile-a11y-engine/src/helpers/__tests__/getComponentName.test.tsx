import { FunctionComponent, PropsWithChildren } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import TestRenderer from 'react-test-renderer';

import getComponentName from '../getComponentName';

const renderView = () => <View />;
const Tree = () => {
  return (
    <SafeAreaView testID="safe_area_view">
      <ScrollView testID="scroll_view">
        <View testID="view">
          <TouchableHighlight accessibilityRole="button" testID="t_highlight">
            <Text testID="text">Test</Text>
          </TouchableHighlight>
          <TouchableOpacity accessibilityRole="button" testID="t_opacity">
            <View>
              <Text>Test2</Text>
            </View>
            <View>
              <Text>Test2</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Pressable accessibilityRole="button" testID="pressable">
          <Switch testID="switch" />
        </Pressable>
        <Modal testID="modal" />
        <Image source={{}} testID="image" accessibilityIgnoresInvertColors />
        <FlatList testID="flat_list" data={[]} renderItem={renderView} />
        <KeyboardAvoidingView testID="keyboard_avoiding_view">
          <TextInput
            accessibilityHint="Input label for test"
            accessibilityLabel="Text input field"
            testID="text_input"
          />
          <TouchableWithoutFeedback accessibilityRole="button" testID="t_without_feedback">
            <Text>A</Text>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
describe('getComponentName tests', () => {
  describe('should recognize built-in components', () => {
    const tree = TestRenderer.create(<Tree />);

    it("should return 'Text' for <Text />", () => {
      const textNode = tree.root.findByProps({ testID: 'text' });
      expect(getComponentName(textNode)).toBe('Text');
    });

    it("should return 'View' for <View />", () => {
      const viewNode = tree.root.findByProps({ testID: 'view' });
      expect(getComponentName(viewNode)).toBe('View');
    });

    it("should return 'TouchableOpacity' for <TouchableOpacity />", () => {
      const tOpacityNode = tree.root.findByProps({ testID: 't_opacity' });
      expect(getComponentName(tOpacityNode)).toBe('TouchableOpacity');
    });

    it("should return 'TouchableHighlight' for <TouchableHighlight />", () => {
      const tHightlightNode = tree.root.findByProps({ testID: 't_highlight' });
      expect(getComponentName(tHightlightNode)).toBe('TouchableHighlight');
    });

    it("should return 'TouchableWithoutFeedback' for <TouchableWithoutFeedback />", () => {
      const twofNode = tree.root.findByProps({ testID: 't_without_feedback' });
      expect(getComponentName(twofNode)).toBe('TouchableWithoutFeedback');
    });

    it("should return 'Pressable' for <Pressable />", () => {
      const pressableNode = tree.root.findByProps({ testID: 'pressable' });
      expect(getComponentName(pressableNode)).toBe('Pressable');
    });

    it("should return 'RCTSwitch' for <Switch />", () => {
      const switchNode = tree.root.findByProps({ testID: 'switch' });
      expect(getComponentName(switchNode)).toBe('RCTSwitch');
    });

    it("should return 'Modal' for <Modal />", () => {
      const modalNode = tree.root.findByProps({ testID: 'modal' });
      expect(getComponentName(modalNode)).toBe('Modal');
    });

    it("should return 'Image' for <Image />", () => {
      const imageNode = tree.root.findByProps({ testID: 'image' });
      expect(getComponentName(imageNode)).toBe('Image');
    });

    it("should return 'FlatList' for <FlatList />", () => {
      const flatListNode = tree.root.findByProps({ testID: 'flat_list' });
      expect(getComponentName(flatListNode)).toBe('FlatList');
    });

    it("should return 'TextInput' for <TextInput />", () => {
      const textInputNode = tree.root.findByProps({ testID: 'text_input' });
      expect(getComponentName(textInputNode)).toBe('TextInput');
    });

    it("should return 'RCTSafeAreaView' for <SafeAreaView />", () => {
      const safeAreaNode = tree.root.findByProps({ testID: 'safe_area_view' });
      expect(getComponentName(safeAreaNode)).toBe('RCTSafeAreaView');
    });

    it("should return 'KeyboardAvoidingView' for <KeyboardAvoidingView />", () => {
      const node = tree.root.findByProps({ testID: 'keyboard_avoiding_view' });
      expect(getComponentName(node)).toBe('KeyboardAvoidingView');
    });
  });
  it("should return 'Custom' for <Custom />", () => {
    const Custom = (props: PropsWithChildren<ViewProps>) => <View {...props} />;

    const tree = TestRenderer.create(
      <View testID="view">
        <Custom testID="custom">
          <Text testID="text">A</Text>
        </Custom>
      </View>,
    );

    const customNode = tree.root.findByProps({ testID: 'custom' });
    expect(getComponentName(customNode)).toBe('Custom');
  });

  it("should return 'Unknown' for components without defined names", () => {
    const tree = TestRenderer.create(<View testID="view" />);

    const viewNode = tree.root.findByProps({ testID: 'view' });

    // Contrived example where a component doesn't have a name or displayName
    // Occurs in some internal components.
    const viewNodeTypes = viewNode.type as FunctionComponent<string | null>;
    (viewNodeTypes.name as unknown) = undefined;
    viewNodeTypes.displayName = undefined;

    expect(getComponentName(viewNode)).toBe('Unknown');
  });
});
