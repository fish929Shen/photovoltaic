function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 150; // 星星数量（可根据性能调整）

    // 清空现有星星（防止重复生成）
    container.innerHTML = '';

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // 随机属性
        const size = Math.random() * 3 + 1; // 1-4px
        const posX = Math.random() * 100;  // 0-100vw
        const posY = Math.random() * 100;  // 0-100vh
        const delay = Math.random() * 5;   // 0-5s
        const duration = 2 + Math.random() * 3; // 2-5s

        // 应用样式
        star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${posX}vw;    /* 使用视窗单位确保全屏覆盖 */
      top: ${posY}vh;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;

        // 20%几率生成彩色星星
        if (Math.random() > 0.8) {
            const colors = ['#67E7D0', '#603BBD', '#00ff9d']; // 直接使用颜色值
            const color = colors[Math.floor(Math.random() * 3)];
            star.style.background = color;
            star.style.boxShadow = `0 0 15px 3px ${color}`;
        }

        container.appendChild(star);
    }
}

// 页面加载时生成星星
window.addEventListener('load', createStars);

// 视窗大小变化时重新生成（保持全屏效果）
window.addEventListener('resize', createStars);