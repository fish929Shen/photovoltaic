// 滚动动画效果
document.addEventListener('DOMContentLoaded', function () {
    const comments = document.querySelectorAll('.comment');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    comments.forEach(comment => {
        observer.observe(comment);

        // 为每个卡片添加随机动画延迟
        const highlight = comment.querySelector('.comment-highlight');
        if (highlight) {
            highlight.style.animationDelay = (Math.random() * 6) + 's';
        }
    });

    // 添加随机浮动太阳能板
    // 修改为只在container内生成太阳能板
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();

    // 添加随机浮动太阳能板（限制在container范围内）
    for (let i = 0; i < 10; i++) {
        const panel = document.createElement('div');
        panel.className = 'solar-panel';

        // 计算相对于container的位置
        const left = Math.random() * containerRect.width;
        const top = Math.random() * containerRect.height;

        panel.style.left = left + 'px';
        panel.style.top = top + 'px';
        panel.style.animationDelay = Math.random() * 5 + 's';
        panel.style.opacity = Math.random() * 0.5 + 0.1;

        container.appendChild(panel);
    }

    // 添加鼠标悬停效果
    comments.forEach(comment => {
        comment.addEventListener('mouseenter', () => {
            const solarPanel = comment.querySelector('.solar-panel');
            if (solarPanel) {
                solarPanel.style.opacity = '0.8';
                solarPanel.style.filter = 'brightness(1.5)';
            }
        });

        comment.addEventListener('mouseleave', () => {
            const solarPanel = comment.querySelector('.solar-panel');
            if (solarPanel) {
                solarPanel.style.opacity = '0.3';
                solarPanel.style.filter = 'brightness(1)';
            }
        });
    });


    // 故事引入部分的滚动动画
    const storyText = document.querySelector('.story-in-text');

    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // 只要文字元素进入视口（哪怕1px）
                storyText.classList.add('visible');
                // storyObserver.unobserve(storyText); // 只触发一次
            }
        });
    }, { threshold: 0.5 }); // 阈值设为0.5（50%进入视口即可）

    storyObserver.observe(storyText); // 监测文字元素
});