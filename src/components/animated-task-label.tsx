import React, { useEffect, memo } from 'react'
import { Pressable, Text, HStack, Box } from 'native-base'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor
} from 'react-native-reanimated'

//interface Props是一个TypeScript中的接口，它可以用来定义React组件的属性类型，以实现类型检查和契约约束。
interface Props {
  strikethrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

//React.memo是一个高阶组件，它可以用来优化纯函数组件和hooks的渲染性能。
const AnimatedTaskLabel = memo((props: Props) => {
  const { strikethrough, textColor, inactiveTextColor, onPress, children } =
    props

  const hstackOffset = useSharedValue(0)
  const hstackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hstackOffset.value }]
    }),
    [strikethrough]
  )
  const textColorProgress = useSharedValue(0)
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor]
  )
  const strikethroughWidth = useSharedValue(0)
  const strikethroughAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikethroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value,
        [0, 1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor]
  )

  useEffect(() => {
    const easing = Easing.out(Easing.quad)
    if (strikethrough) {
      hstackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      )
      strikethroughWidth.value = withTiming(1, { duration: 400, easing })
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      )
    } else {
      strikethroughWidth.value = withTiming(0, { duration: 400, easing })
      textColorProgress.value = withTiming(0, { duration: 400, easing })
    }
  })

  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems="center" style={[hstackAnimatedStyles]}>
        <AnimatedText
          fontSize={19}
          noOfLines={1}
          isTruncated
          px={1}
          style={[textColorAnimatedStyles]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox
          position="absolute"
          h={1}
          borderBottomWidth={1}
          style={[strikethroughAnimatedStyles]}
        />
      </AnimatedHStack>
    </Pressable>
  )
})

export default AnimatedTaskLabel

// Animated.View：一个可以用来渲染动画视图的组件，它可以接受useAnimatedStyle返回的动画样式对象。12
// Animated.ScrollView：一个可以用来渲染动画滚动视图的组件，它可以接受useAnimatedScrollHandler返回的滚动处理函数。12
// Animated.FlatList：一个可以用来渲染动画列表视图的组件，它可以接受useAnimatedScrollHandler返回的滚动处理函数。12
// Animated.Text：一个可以用来渲染动画文本的组件，它可以接受useAnimatedProps返回的动画属性对象。12
// react-native-reanimated中的一些API有：

// useSharedValue：一个自定义hook，它可以用来创建一个共享值，这个值可以在UI线程和JS线程之间传递，用于驱动动画。12
// useAnimatedStyle：一个自定义hook，它可以用来创建一个动画样式对象，这个对象可以传递给Animated组件的style属性，实现动画效果。12
// useAnimatedScrollHandler：一个自定义hook，它可以用来创建一个滚动处理函数，这个函数可以传递给Animated.ScrollView或Animated.FlatList组件的onScroll属性，实现滚动相关的动画。12
// useAnimatedProps：一个自定义hook，它可以用来创建一个动画属性对象，这个对象可以传递给Animated.Text组件的animatedProps属性，实现文本相关的动画。