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
import { ref, onMounted, onUnmounted } from 'vue';

interface SnakeCell {
  x: number;
  y: number;
}

let canvas: HTMLCanvasElement | null;
let ctx: CanvasRenderingContext2D | null;
let snake: SnakeCell[];
let food: SnakeCell;
let direction: { x: number; y: number } = { x: 0, y: 1 };
let score = ref(0);
let lastUpdateTime = 0;
let isMounted = ref(true); // Variable pour vérifier si le composant est monté

const cellSize = 25;
const speed = 200;

const canvasWidth = window.innerWidth - 80;
const canvasHeight = 400;

const createCanvas = () => {
  canvas = document.querySelector('canvas');
  if (canvas) {
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }
};

const createSnake = () => {
  snake = [{ x: Math.floor(canvasWidth / cellSize / 2), y: Math.floor(canvasHeight / cellSize / 2) }];
};

const createFood = () => {
  food = {
    x: Math.floor(Math.random() * (canvasWidth / cellSize)),
    y: Math.floor(Math.random() * (canvasHeight / cellSize)),
  };
};

const draw = () => {
  if (ctx && isMounted.value) {
    ctx.clearRect(0, 0, canvas!.width, canvas!.height);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach((cell) => {
      ctx?.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
  }
};

const update = (currentTime: number) => {
  if (currentTime - lastUpdateTime > speed) {
    if (!snake || snake.length === 0 || !direction || !isMounted.value) {
      return;
    }

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (
      newHead.x < 0 ||
      newHead.x >= canvasWidth / cellSize ||
      newHead.y < 0 ||
      newHead.y >= canvasHeight / cellSize ||
      isCollisionWithSelf(newHead)
    ) {
      score.value = 0;
      createSnake();
    } else {
      snake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
        score.value += 1;
        createFood();
      } else {
        snake.pop();
      }
    }

    draw();

    lastUpdateTime = currentTime;
  }

  requestAnimationFrame(() => update(performance.now()));
};

const isCollisionWithSelf = (head: SnakeCell) => {
  return snake.slice(1).some((cell) => cell.x === head.x && cell.y === head.y);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (
    event.key === 'ArrowUp' ||
    event.key === 'ArrowDown' ||
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight'
  ) {
    event.preventDefault();
    if (event.key === 'ArrowUp' && direction.y !== 1) {
      direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y !== -1) {
      direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x !== 1) {
      direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x !== -1) {
      direction = { x: 1, y: 0 };
    }
  }
};

const gameLoop = () => {
  createCanvas();
  createSnake();
  createFood();

  const loop = () => {
    draw();
    update(performance.now());
    setTimeout(loop, 1000 / 60); // Run at 60 frames per second
  };

  loop();
};

onMounted(() => {
  gameLoop();
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  isMounted.value = false; // Définir la variable isMounted à false lors du démontage
  window.removeEventListener('keydown', handleKeydown);
});
</script>
