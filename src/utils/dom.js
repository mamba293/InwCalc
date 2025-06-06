export function greet(message) {
  const app = document.getElementById('app');
  const h1 = document.createElement('h1');
  h1.textContent = message;
  app.appendChild(h1);
}