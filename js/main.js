const canvas = document.getElementById("snake_game");
const ctx = canvas.getContext("2d");
let snake_color=document.getElementById("snake_color")
let  pole_color=document.getElementById("pole_color")
const btn_save=document.getElementById("save")
const btn_clear=document.getElementById("clear")
const btn_new_game=document.getElementById("new_game")
// Начальные координаты яблока
let apple = {
  x: 400,
  y: 400,
};

// Размер одной клеточки на поле - 16 пикселей
const size_block = 16;

// Временная переменная для повышения скорости
let temp_speed = 0;

// Змейка и её свойства
let snake = {
  // начальные координаты
  x: 160,
  y: 160,
  // Скорость змейки
  // В каждом кадре смещается по оси X или Y
  // Изначально по горизонтали.
  dx: size_block,
  dy: 0,
  // Хвост змейки. Изначально пустой
  cells: [],
  // Минимальная длина змейки - 3 ячейки
  minCells: 3,
};

// Функция для рандомного числа для появления яблок
function get_random_apple(min, max) {
  const number = Math.floor(Math.random() * (max - min)) + min;
  return number;
}

// Анимация игры Змейка
function animation_game() {
  requestAnimationFrame(animation_game);

  if (++temp_speed < 4) {
    return;
  }
  // Обнуляем перекменную для скорости
  temp_speed = 0;

  // Очищаем поле
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Двигаем змейку
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Если змейка достигла края поля
  if (snake.x < 0) {
    snake.x = canvas.width - size_block;
  }
  if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - size_block;
  }
  if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // Логика для движения
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.minCells) {
    snake.cells.pop();
  }

  // Отображение яблока
  ctx.fillStyle = "green";
  ctx.fillRect(apple.x, apple.y, size_block - 1, size_block - 1);

  // Движение змейки
  // Проверять не столкнулась ли змея сама с собой
  if(localStorage.getItem("snake_color")){
    ctx.fillStyle = localStorage.getItem("snake_color")
  
  }
  else{
    ctx.fillStyle = "red";
  }
  if(localStorage.getItem("pole_color")){
    canvas.style.background = localStorage.getItem("pole_color")
   
   }
   else{
     canvas.style.background  = "black";
   }
  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, size_block - 1, size_block - 1);
    // Если змейка добралась до яблока
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.minCells++;
      // Рисуем новое яблоко
      apple.x = get_random_apple(0, 50) * size_block;
      apple.y = get_random_apple(0, 50) * size_block;
    }

    // Проверяем не столкнулась ли змейка сама с собой
    for (let i = index + 1; i < snake.cells.length; i++) {
      // Если змейка столкнулась
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        // первоначальные координаты для змейки
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.minCells = 3;
        snake.dx = size_block;
        snake.dy = 0;
 
        // Случайное место для яблока
        apple.x = get_random_apple(0, 50) * size_block;
        apple.y = get_random_apple(0, 50) * size_block;
      }
    }
  });
}

// Слушатель событий на нажатие клавиш (передвижение змейки)
document.addEventListener("keydown", (event) => {
  // Проверяем какая клавиша нажата
  // На лево
  if (event.which === 65 && snake.dx === 0) {
    snake.dx = -size_block;
    snake.dy = 0;
  }
  // На право
  if (event.which === 68 && snake.dx === 0) {
    snake.dx = size_block;
    snake.dy = 0;
  }
  // Вверх
  if (event.which === 87 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -size_block;
  }
  // Вниз
  if (event.which === 83 && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = size_block;
  }
});
btn_save.addEventListener("click",()=>{
  localStorage.setItem("snake_color", snake_color.value)
 localStorage.setItem("pole_color",pole_color.value)
  console.log("saved");
})
btn_clear.addEventListener("click",()=>{
  localStorage.clear()
})
btn_new_game.addEventListener("click",()=>{
  location.reload()

})

requestAnimationFrame(animation_game);
