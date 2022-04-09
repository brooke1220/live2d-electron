export default {
    model: {
      jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json',
      scale: 1,
    },
    display: {
      superSample: 2,
      width: 200,
      height: 400,
      position: 'right',
      hOffset: 0,
      vOffset: -20,
    },
    mobile: {
      show: true,
      scale: 0.8,
      motion: true,
    },
    name: {
      canvas: 'live2dcanvas',
      div: 'live2d-widget',
    },
    react: {
      opacity: 1,
    },
    dev: {
      border: false
    },
    dialog: {
      enable: false,
      script: null
    }
  }