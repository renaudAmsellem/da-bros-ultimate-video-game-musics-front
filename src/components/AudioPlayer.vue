<script setup>
const props = defineProps(['fileName', 'play', 'pause', 'next', 'isPaused'])
</script>

<template>
<div class="wrapper">
  <div class="player__container">
    <div class="player__body">
      <div class="body__cover">
        <ul class="list list--cover">
          <li>
            <a class="list__link" href=""><i class="fa fa-navicon"></i></a>
          </li>

          <li>
            <a class="list__link" href=""></a>
          </li>

          <li>
            <a class="list__link" href=""><i class="fa fa-search"></i></a>
          </li>
        </ul>

        <img src="../assets/mario_listening_music.png" alt="Album cover" />
        
        <div class="range"></div>
      </div>
      
      <div class="body__info">
        <div class="info__song">{{ fileName }}</div>
      </div>

      <div class="body__buttons">
        <ul class="list list--buttons">
          <li><a href="#" class="list__link"><i class="fa fa-step-backward"></i></a></li>

          <li v-if="isPaused" @click="props.play"><img src="../assets/playIcon.png" /></li>
          <li v-if="!isPaused" @click="props.pause"><img src="../assets/pauseIcon.png" /></li>

          <li @click="props.next"><img src="../assets/nextIcon.png" /></li>
        </ul>
      </div>
    </div>

    <div class="player__footer">
      <ul class="list list--footer">
        <li><a href="#" class="list__link"><i class="fa fa-heart-o"></i></a></li>
        
        <li><a href="#" class="list__link"><i class="fa fa-random"></i></a></li>
        
        <li><a href="#" class="list__link"><i class="fa fa-undo"></i></a></li>
        
        <li><a href="#" class="list__link"><i class="fa fa-ellipsis-h"></i></a></li>
      </ul>
    </div>
  </div>
</div>
</template>

<style lang="scss">
// Functions
@function remy($value, $base: 16px) {
  @return calc(($value / $base) * 1rem);
}

// Mixins
@mixin transition($prop: all, $duration: .25s, $timing: cubic-bezier(.4, 0, 1, 1)) {
  transition: $prop $duration $timing;
}

// Colors
$color-black: #212121;
$color-blue: #03a9f4;
$color-red: #d30320;

// Variables
$boxshadow-0: 0 1px 3px -5px rgba(0, 0, 0, .13),
0 1px 3px -10px rgba(0, 0, 0, .23);
$boxshadow-1: 0 3px 6px -5px rgba(0, 0, 0, .16),
0 3px 6px -10px rgba(0, 0, 0, .23);
$boxshadow-2: 0 10px 20px -5px rgba(0, 0, 0, .19),
0 6px 6px -10px rgba(0, 0, 0, .23);
$boxshadow-3: 0 14px 28px -5px rgba(0, 0, 0, .25),
0 10px 10px -10px rgba(0, 0, 0, .22);
$radius: remy(4px);

// Base
html {
  font-size: 16px;
}

body {
  font-family: 'Roboto', Arial, Verdana, sans-serif;
  background: #e4f2fb;
}

a {
  text-decoration: none;
}

.player__container {
  margin-top: 2rem;
  margin-right: auto;
  margin-left: auto;
  max-width: remy(320px);
  background: #fff;
  border-radius: $radius;
  box-shadow: $boxshadow-2;
}

.body__cover {
  position: relative;
}

.body__cover img {
  max-width: 100%;
  border-radius: $radius;
}

.list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.body__buttons,
.body__info,
.player__footer {
  padding-right: 2rem;
  padding-left: 2rem;
}

.list--cover,
.list--footer {
  justify-content: space-between;
}

.list--cover {
  position: absolute;
  top: .5rem;
  width: 100%;

  li:first-of-type {
    margin-left: 1.75rem;
  }

  li:last-of-type {
    margin-right: .75rem;
  }
}

.body__info {
  padding-top: 1.5rem;
  padding-bottom: 1.25rem;
  text-align: center;
}

.info__album,
.info__song {
  margin-bottom: .5rem;
}

.info__song {
  font-size: 1.15rem;
  font-weight: 400;
  color: $color-red;
}

.body__buttons {
  padding-bottom: 2rem;
}

.body__buttons {
  padding-top: 1rem;
}

.list--buttons {
  align-items: center;
  justify-content: center;
}

.list--buttons li:nth-of-type(n+1) {
  margin-left: 1.5rem;
}

.player__footer {
  padding-top: 1rem;
  padding-bottom: 2rem;
}

.list--footer a {
  opacity: .5;

  &:focus,
  &:hover {
    opacity: .9;
  }
}

li {
    cursor: pointer;
}

</style>