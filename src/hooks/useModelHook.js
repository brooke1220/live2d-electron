import { ref, computed } from '@vue/composition-api'
import models from '../model'
import _ from 'lodash'

export const useModelHook = (name = 'shizuku') => {
    let modelName = ref(name)

    const model = computed(() => {
        return _.find(models, {name: modelName.value})
    })

    const setModel = (name) => {
        modelName.value = name
    }

    return [model, setModel]
}