<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div id="holder">
      Drag your file here1
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/renderer/components/HelloWorld.vue";

const { ipcRenderer } = window.require('electron')
const { remote } = window.require('electron')
const { Menu, MenuItem } = remote

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    this.drop()
    this.ipc()
    this.menu()
  },

  methods: {
    // 拖拽到区域获取path
    drop() {
      document.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();

        for (let f of e.dataTransfer.files) {
          console.log('File(s) you dragged here: ', f.path)
        }
      });
      document.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
      // dosomthing
    },

    // 通信
    ipc() {
      console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
      ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) // prints "pong"
      })
      ipcRenderer.send('asynchronous-message', 'ping')
    },

    // 菜单
    menu() {
      const menu = new Menu()
      menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
      menu.append(new MenuItem({ type: 'separator' }))
      menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

      window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        menu.popup({ window: remote.getCurrentWindow() })
      }, false)
    }
  }
};
</script>
