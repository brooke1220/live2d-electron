<template>
    <div ref="page" class="pagewarp">
        <div div ref="el" :style="style" style="position: fixed; width: 200px; height: 280px;opacity: 1;">
            <canvas id="live2dcanvas" width="400" height="800" style="position: absolute; left: 0px; top: 0px; width: 200px; height: 280px;"></canvas>
        </div>
    </div>
</template>

<script>
    import { defineComponent, onMounted, ref, watch} from '@vue/composition-api'
    import { useDraggable, useElementSize, useElementHover } from '@vueuse/core'
    import L2Dwidget from 'L2Dwidget'

    export default defineComponent({
        setup(){
            let el = ref(null)
            let page = ref(null)

            const { width, height } = useElementSize(page)

            const { x, y, style } = useDraggable(el, {
                initialValue: { x: 0, y: 0 },
            })

            onMounted(() => {
                L2Dwidget.init({
                    name: {
                        canvas: 'live2dcanvas',
                        div: 'live2d-widget',
                    },
                    dialog: {
                        // 开启对话框
                        enable: false,
                        script: {
                            // 每空闲 10 秒钟，显示一条一言
                            'every idle 10s': '$hitokoto$',
                            // 当触摸到星星图案
                            'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
                            // 当触摸到角色身体
                            'tap body': '哎呀！别碰我！',
                            // 当触摸到角色头部
                            'tap face': '人家已经不是小孩子了！'
                        }
                    }
                })
            })

            watch(width, (w) => {
                x.value = w - 220
            })

            watch(height, (h) => {
                y.value = h - 300
            })

            const isHovered = useElementHover(el)

            if(! window.setIgnoreMouseEvents){
                window.setIgnoreMouseEvents = async (hoverd) => {
                    console.log(hoverd)
                }
            }

            watch(isHovered, (hoverd) => {
                (async () => {
                    await window.setIgnoreMouseEvents(hoverd)
                })()
            })

            return {
                el,
                page,
                style,
                isHovered
            }
        }
    })
</script>

<style>
    .pagewarp{
        height: 100vh;
    }

    #live2d-widget{
        display: none;   
    }
</style>