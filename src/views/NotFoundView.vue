<template>
  <v-container fluid>
    <v-card rounded="0">
      <v-card-title class="text-center">{{ $t('404.title') }}</v-card-title>
      <v-card-subtitle>{{ $t('404.score') }}: {{ score }}</v-card-subtitle>
      <v-card-text>
        <canvas
          ref="canvas"
          :width="canvasWidth"
          :height="canvasHeight"
          style="border: 1px solid"
        ></canvas>
      </v-card-text>
    </v-card>
    <v-btn rounded="0" block to="/">{{ $t('404.button') }}</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface SnakeCell {
  x: number
  y: number
}

let canvas: HTMLCanvasElement | null
let ctx: CanvasRenderingContext2D | null
let snake: SnakeCell[]
let food: SnakeCell
let direction: { x: number; y: number } = { x: 0, y: 1 }
let score = ref(0)
let lastUpdateTime = 0

const cellSize = 25
const speed = 200

// Utilise la largeur du navigateur pour définir la taille du canvas
const getBrowserWidth = () => window.innerWidth - 80

const canvasWidth = getBrowserWidth()
const canvasHeight = 400

const createCanvas = () => {
  canvas = document.querySelector('canvas')
  if (canvas) {
    ctx = canvas.getContext('2d')
    // Utilise la largeur et la hauteur calculées pour définir la taille du canvas
    canvas.width = canvasWidth
    canvas.height = canvasHeight
  }
}

const createSnake = () => {
  snake = [
    { x: Math.floor(canvasWidth / cellSize / 2), y: Math.floor(canvasHeight / cellSize / 2) }
  ]
}

const createFood = () => {
  food = {
    x: Math.floor(Math.random() * (canvasWidth / cellSize)),
    y: Math.floor(Math.random() * (canvasHeight / cellSize))
  }
}

const draw = () => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas!.width, canvas!.height)

    // Draw snake
    ctx.fillStyle = 'green'
    snake.forEach((cell) => {
      ctx?.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize)
    })

    // Draw food
    ctx.fillStyle = 'red'
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize)
  }
}

const update = (currentTime: number) => {
  if (currentTime - lastUpdateTime > speed) {
    // Update snake position, check collisions, etc.
    if (!snake || snake.length === 0 || !direction) {
      return
    }

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    }

    // Check if snake collides with walls or itself
    if (
      newHead.x < 0 ||
      newHead.x >= canvasWidth / cellSize ||
      newHead.y < 0 ||
      newHead.y >= canvasHeight / cellSize ||
      isCollisionWithSelf(newHead)
    ) {
      // Game over, reset
      score.value = 0
      createSnake()
    } else {
      snake.unshift(newHead)

      // Check if snake eats food
      if (newHead.x === food.x && newHead.y === food.y) {
        score.value += 1
        createFood() // Déplace createFood ici
      } else {
        snake.pop()
      }
    }

    draw()

    lastUpdateTime = currentTime
  }

  requestAnimationFrame(() => update(performance.now()))
}

const isCollisionWithSelf = (head: SnakeCell) => {
  return snake.slice(1).some((cell) => cell.x === head.x && cell.y === head.y)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (
    event.key === 'ArrowUp' ||
    event.key === 'ArrowDown' ||
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight'
  ) {
    event.preventDefault()
    if (event.key === 'ArrowUp' && direction.y !== 1) {
      direction = { x: 0, y: -1 }
    } else if (event.key === 'ArrowDown' && direction.y !== -1) {
      direction = { x: 0, y: 1 }
    } else if (event.key === 'ArrowLeft' && direction.x !== 1) {
      direction = { x: -1, y: 0 }
    } else if (event.key === 'ArrowRight' && direction.x !== -1) {
      direction = { x: 1, y: 0 }
    }
  }
}

const handleWheel = (event: WheelEvent) => {
  // Bloquer le scroll seulement si la molette de la souris est utilisée
  event.preventDefault()
}

const gameLoop = () => {
  createCanvas()
  createSnake()
  createFood()

  const loop = () => {
    draw()
    update(performance.now())
    requestAnimationFrame(loop)
  }

  loop()
}

onMounted(() => {
  // Bloquer le scroll seulement sur cette page
  document.body.addEventListener('wheel', handleWheel, { passive: false })
  gameLoop()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  // Rétablir le scroll quand la page est démontée
  document.body.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
