---
---

# threejs

## 起步

需要以下几个对象：场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。

:::demo

```vue
<template>
  <div id="container" style="height:200px"></div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    let draw = () => {
      const scene = new THREE.Scene()
      // 透视摄像机
      // PerspectiveCamera（视野角度（FOV）, 长宽比（aspect ratio）, 远剪切面, 近剪切面）
      let container = document.getElementById('container')
      const camera = new THREE.PerspectiveCamera(
        30,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      )
      // 渲染器
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)
      // BoxGeometry（立方体）x,y,z
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      // 材质
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      // 网格
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5
      // 渲染场景,动画循环
      const animate = function () {
        //requestAnimationFrame的优点，最重要的一点就是当用户切换到其它的标签页时，它会暂停，从而节省资源
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
      }

      animate()
    }

    onMounted(() => {
      draw()
    })
  },
}
</script>

<style lang="less" scoped>
#containers {
  width: 100%;
  height: 300px;
  background: rgba(125, 247, 108, 0.699);
}
</style>
```

:::

## 画线

:::demo

```vue
<template>
  <div id="drawLine" style="height:200px"></div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    let draw = () => {
      // 获取dom
      let drawLine = document.getElementById('drawLine')
      // 渲染器
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(drawLine.clientWidth, drawLine.clientHeight)
      drawLine.appendChild(renderer.domElement)
      // 相机
      const camera = new THREE.PerspectiveCamera(
        1,
        drawLine.clientWidth / drawLine.clientHeight,
        1,
        500
      )
      camera.position.set(0, 0, 100)
      camera.lookAt(0, 0, 0)
      // 场景
      const scene = new THREE.Scene()
      // 材质，对于线条来说，我们能使用的材质只有LineBasicMaterial 或者 LineDashedMaterial
      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      // 使用BufferGeometry,Geometry已被弃用
      const geometry = new THREE.BufferGeometry()
      const pointsArray = new Array()
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 2 - 1 //范围在-1到1
        const y = Math.random() * 2 - 1
        const z = Math.random() * 2 - 1
        pointsArray.push(new THREE.Vector3(x, y, z))
        //顶点
        //geometry.vertices.push(new THREE.Vector3(x,y,z))
      }
      //用这个api传入顶点数组
      geometry.setFromPoints(pointsArray)

      const line = new THREE.Line(geometry, material)

      scene.add(line)
      renderer.render(scene, camera)
    }

    onMounted(() => {
      draw()
    })
  },
}
</script>

<style lang="less" scoped>
#containers {
  width: 100%;
  height: 300px;
  background: rgba(125, 247, 108, 0.699);
}
</style>
```

:::

## 创建文字
