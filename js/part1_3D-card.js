// 更新时间显示
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('current-time').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

// 文字渐现效果
document.addEventListener('DOMContentLoaded', function () {
    const contentTexts = document.querySelectorAll('.content-text');

    // 使用Intersection Observer API实现滚动渐现效果
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    contentTexts.forEach(text => {
        observer.observe(text);
    });

    // 点击查看光伏优势
    document.querySelectorAll('.bottom-section').forEach((section, index) => {
        section.addEventListener('click', function () {
            document.querySelectorAll('.flip-card')[index].style.transform = 'rotateY(180deg)';
        });
    });

    // 添加赛博朋克音效
    const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-click-1114.mp3');
    hoverSound.volume = 0.3;

    document.querySelectorAll('.bottom-section, .flip-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });


    // 卡片翻转控制（核心修改）
    // 卡片翻转控制（修复版）
    const flipCards = document.querySelectorAll('.flip-card');
    const bottomSections = document.querySelectorAll('.bottom-section');

    // 为每个卡片添加翻转状态标记
    flipCards.forEach(card => {
        card.dataset.flipped = 'false'; // 添加自定义属性记录翻转状态
    });

    // 点击"查看优势"按钮，触发对应卡片翻转
    bottomSections.forEach((section, index) => {
        section.addEventListener('click', function () {
            const card = flipCards[index];
            // 根据当前状态切换
            if (card.dataset.flipped === 'false') {
                card.style.transform = 'rotateY(180deg)';
                card.dataset.flipped = 'true';
            } else {
                card.style.transform = 'rotateY(0deg)';
                card.dataset.flipped = 'false';
            }
        });
    });


});