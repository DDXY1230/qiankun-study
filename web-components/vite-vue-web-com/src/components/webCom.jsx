import { defineComponent } from '@vue/runtime-core'

export default defineComponent(() => () => (
  <div>
  <h1>hhhhhhh呵呵呵呵呵</h1>
  <fc-bubbles Click>
  {/* 用jsx的方式也解决不了,这里说明vue3.0有bug,后续再解决 但是把Click 改成大写就可以了 */}
    <h1>
      JSX
    </h1>
  </fc-bubbles>
  </div>
))
