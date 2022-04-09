<template>
    <div ref="page" class="pagewarp">
        <div ref="el" :style="`height: ${modelAttr.height}px;width: ${modelAttr.width}px;${style}`" style="position: fixed; opacity: 1;" v-if="! reload">
            <div class="live2d-switch cursor-pointer" alt="切换" v-show="isHovered" @click="onSwitchHandle">
                <i class="iconfont icon-switch"></i>
            </div>
            <canvas id="live2dcanvas" :style="`height: ${modelAttr.height}px;width: ${modelAttr.width}px;`" style="position: absolute; left: 0px; bottom: 0px;"></canvas>
        </div>
    </div>
</template>

<script>
    import { computed, defineComponent, onMounted, ref, watch, nextTick} from '@vue/composition-api'
    import { useDraggable, useElementSize, useElementHover } from '@vueuse/core'
    import { L2Dwidget } from './libs/L2Dwidget'
    import { useModelHook } from '@/hooks/useModelHook'
    import models from './model'
    import _ from 'lodash'

    export default defineComponent({
        setup(){
            let el = ref(null)
            let page = ref(null)
            let reload = ref(false)

            const { width, height } = useElementSize(page)

            const { x, y, style } = useDraggable(el, {
                initialValue: { x: 0, y: 0 },
            })

            let [ model, setModel ] = useModelHook('shizuku')

            const L2Dinit = (config) => {
                L2Dwidget.init({
                    model: {
                        jsonPath: config.jsonPath
                    }
                })
            }

            let modelAttr = computed(() => {
                return model.value.attr
            })

            onMounted(() => {
                L2Dinit({ jsonPath: model.value.jsonPath })
            })

            watch(model, (newModel) => {
                reload.value = true
                document.getElementById('live2d-widget').remove()
                nextTick(() => {
                    reload.value = false
                    L2Dinit({ jsonPath: newModel.jsonPath })
                })
            })

            watch(width, (w) => {
                x.value = w - (parseInt(modelAttr.value.width) + 20)
            })

            watch(height, (h) => {
                y.value = h - (parseInt(modelAttr.value.height) + 20)
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

            const onSwitchHandle = () => {
                let index = _.random(0, models.length - 1)
                setModel(models[index].name)
            }

            return {
                el,
                page,
                isHovered,
                reload,
                modelAttr,
                style,
                model,
                onSwitchHandle
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

    .live2d-switch {
        position: absolute;
        left: 0px;
        z-index: 1;
    }

    .live2d-switch i {
        font-size: 32px;
    }
</style>