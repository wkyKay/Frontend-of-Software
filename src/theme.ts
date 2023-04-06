import { extendTheme } from 'native-base'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
}

const colors = {
  primary: {
    50: '#EEF2F6',
    100: '#CFD9E7',
    200: '#B1C1D8',
    300: '#92A9C9',
    400: '#7491B9',
    500: '#5578AA',
    600: '#446088',
    700: '#334866',
    800: '#223044',
    900: '#111822'
  }
}

export default extendTheme({ config, colors })


/*extendTheme是native-base中的一个函数，它可以让你自定义native-base的主题1。你可以使用extendTheme来修改native-base主题中的一些属性，例如颜色，字体，配置等1。例如：

const theme = extendTheme({ colors: { // Add new color primary: { 50: “#E3F2F9”, 100: “#C5E4F3”, 200: “#A2D4EC”, 300: “#7AC1E4”, 400: “#47A9DA”, 500: “#0088CC”, 600: “#007AB8”, 700: “#006BA1”, 800: “#005885”, 900: “#003F5E” } }, });

你也可以使用extendTheme来让你的组件适应不同的颜色模式2。你可以使用_light和_dark这两个属性来指定组件在亮色和暗色模式下的样式*/