<template>
  <div :style="style" class="avatar">
    <table>
      <tbody>
        <tr>
          <td v-if="!hasImage">
            {{ initials }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import {getTextColorFromName, getBgColorFromName} from "@/services/helper-service"
    import useGlobals from "@/globals/composables"

    const {apiBaseUrl} = useGlobals()

    // eslint-disable-next-line
    const props = defineProps({
        size:{ type: [Number,String] },
        fullName: { type: String, default: '' },
        radius: { type: Number,default: 50, validator: (value :number) => value >= 0 && value <= 50},
        radiusUnit:{type:String,default:'%'},
        color: { type: String, default: '' },
        src: { type: String, default: '' },
        letterCount:{type:Number, default:2, validator: (count:1 | 2 | 3) => [1,2,3].includes(count)}
    })

    const initials = computed(()=>{
        const words = props.fullName.split(/[\s-]+/)
        return words.map((word:string) => word.substr(0, 1)).join('').substr(0, props.letterCount).toUpperCase()
    })
    const hasImage = computed(()=>props.src !== '')
    //const hasImage = computed(()=>props.src !== '' && imageExists(props.src, (exists:boolean) => exists)) //TODO: check why this does not work well

    const avatarSrc = computed(()=>{
      const path = /^https?:\/\//i;
      if(hasImage.value){
        return path.test(props.src) ? encodeURI(props.src) : encodeURI(apiBaseUrl.value+props.src)
      }
      return ''
    })

    const style = computed(()=>{
      const fontSize = props.letterCount > 2 ? Number(props.size) / 3 : Number(props.size) / 2
      return {
        width: props.size + 'px',
        height: props.size + 'px',
        'border-radius': props.radius + props.radiusUnit,
        'font-size': fontSize + 'px',
        'color': !hasImage.value ? getTextColorFromName(props.fullName) : '',
        'background-color': !hasImage.value ? getBgColorFromName(props.fullName) : '',
        'background-image': hasImage.value ? 'url(' + avatarSrc.value + ')' : 'none'
      }
    })
</script>

<style scoped>
.avatar {
  display: inline-block;
  background-color: black;
  color: white;
  width: 48px;
  height: 48px;
  font-size: 12px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: none;
}
.avatar table {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-spacing: 0;
}
.avatar table td {
  text-align: center;
  vertical-align: middle;
}
.avatar img {
  width: 100%;
  overflow: hidden;
}
</style>