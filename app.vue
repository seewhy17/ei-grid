<template>
  <div>
    <div class="container">
      <h1>Filter</h1>
      <div>
        <h3>Shapes</h3>
        <div class="flex">
          <label v-for="(shape, index) of shapes" class="button" :key="index">
            <input type="checkbox" :value="shape" @change="filterByShape">
            <div>{{ shape }}</div>
          </label>
        </div>

      </div>

      <div>
      <h3>Colors</h3>
      <div class="flex">
        <label v-for="(color, index) of colors" class="color-box" :key="index">
          <input type="checkbox" :value="color" @change="filterByColor">
          <div :style="{ backgroundColor: color }"></div>
        </label>

      </div>

      </div>


    </div>
    <div class="container">
      <p class="title">{{ title }}</p>
    </div>

    <div v-show="filtered.length > 0" class="container grid">
      <div v-for="item of filtered" :key="item.id" class="item">
        <div :class="item.shape" :style="{ backgroundColor: item.color }"></div>
      </div>
    </div>

  </div>
</template>
<script>
  import { reactive, toRefs, computed, onMounted } from 'vue'
  export default {
    setup() {
      const state = reactive({
        items: [
          { id: 1, shape: 'triangle', color: 'red' },
          { id: 2, shape: 'square', color: 'pink' },
          { id: 3, shape: 'circle', color: 'orange' },
          { id: 4, shape: 'square', color: 'red' },
          { id: 5, shape: 'triangle', color: 'orange' },
          { id: 6, shape: 'circle', color: 'pink' },
          { id: 7, shape: 'triangle', color: 'pink' },
          { id: 8, shape: 'circle', color: 'red' },
          { id: 8, shape: 'square', color: 'orange' }
        ],


        filters: {
          colors: new Set(),
          shapes: new Set(),
        },

        colors: computed(() => {
          const colors = state.items.map(item => item.color)
          return [...new Set(colors)]
        }),

        shapes: computed(() => {
          const shapes = state.items.map(item => item.shape)
          return [...new Set(shapes)]
        }),

        filtered: computed(() => {
          if (state.filters.colors.size < 1 && state.filters.shapes.size < 1) {
            return state.items
          }

          if (state.filters.colors.size >= 1 && state.filters.shapes.size < 1) {
            return state.items.filter(items => state.filters.colors.has(items.color))
          }

          if (state.filters.shapes.size >= 1 && state.filters.colors.size < 1) {
            return state.items.filter(items => state.filters.shapes.has(items.shape))
          }

          if (state.filters.colors.size >= 1 && state.filters.shapes.size >= 1) {
             return state.items
              .filter(items => state.filters.shapes.has(items.shape))
              .filter(items => state.filters.colors.has(items.color))
          }

        }),

        title: computed(() => {
          if (state.filters.colors.size == state.colors.length && state.filters.shapes.size == state.shapes.length) {
            return 'All items'
          }

          if (state.filters.colors.size == state.colors.length && state.filters.shapes.size < state.shapes.length && state.filters.shapes.size > 1) {
            return `Multiple items`
          }

          if (state.filters.shapes.size == state.shapes.length && state.filters.colors.size < state.colors.length && state.filters.colors.size > 1) {
            return `Multiple items`
          }

          if (state.filters.shapes.size == state.shapes.length && state.filters.colors.size == 1) {
            return `All ${state.filters.colors.values().next().value} items`
          }

          if (state.filters.colors.size == state.colors.length && state.filters.shapes.size == 1) {
            return `All ${state.filters.shapes.values().next().value} items`
          }

          if (state.filters.shapes.size >= 2 && state.filters.colors.size == 1) {
            return `Multiple ${state.filters.colors.values().next().value} items`
          }

          if (state.filters.colors.size >= 2 && state.filters.shapes.size == 1) {
            return `Multiple ${state.filters.shapes.values().next().value} items`
          }


          if (state.filters.colors.size == 1 && state.filters.shapes.size == 1) {
            return `${state.filters.colors.values().next().value} ${state.filters.shapes.values().next().value} item`

          }
        }),

        filterByShape: (event) => (event.target.checked) ?
          state.filters.shapes.add(event.target.value) :
          state.filters.shapes.delete(event.target.value),

        filterByColor: (event) => (event.target.checked) ?
          state.filters.colors.add(event.target.value) :
          state.filters.colors.delete(event.target.value),
      })


      return { ...toRefs(state) }
    }
  }
</script>
<style>
  body {
    background-color: rgb(102, 100, 100);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.2rem;
  }
  h3 {
    font-size: 1rem;
    color: blue;
  }

  .title {
    color:rgb(247, 246, 246);
  }

  .container {
    max-width: 1200px;
    margin: 2em auto 2em;
  }

  .grid {
    display: grid;
    margin: 0 auto;
    max-width: 1200px;
    grid-gap: 1rem;
  }

  @media (min-width: 600px) {
   .grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (min-width: 900px) {
   .grid { grid-template-columns: repeat(2, 1fr); }
  }

  .item {
    height: 200px;
    display: grid;
    place-items: center;
    background-color: aliceblue;
  }


  .item > div{
    width: 100px;
    height: 100px;
    background-color: aliceblue;
  }

  .circle {
    clip-path: circle();
  }

  .square {
    width: inherit;
    height: inherit;
  }

  .triangle {
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  .flex {
    display: flex;
    grid-gap: .6em;
  }

  .button {
    display: flex;
    position: relative;
    background-color: rgb(247, 246, 246);
    border: transparent;
    text-transform: capitalize;
  }

  .button div {
    padding: .6em;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .color-box {
     border-radius: 50%;
     position: relative;
     width: 50px;
     height: 50px;
     box-sizing: border-box;
  }

  .color-box div {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .color-box > input, .button > input {
    /* visibility: hidden; */
    display: none;
  }

  .color-box > input[type=checkbox]:checked ~ div {
    border: solid 3px black;
  }


  .button > input[type=checkbox]:checked ~ div {
    background-color: rgb(244, 220, 188);
  }
</style>
