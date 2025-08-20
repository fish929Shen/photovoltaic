
// 初始化函数
document.addEventListener('DOMContentLoaded', function () {
    // 初始化Tab切换
    initTabSwitching();

    // 初始化页面动画
    initPageAnimations();

    // 创建背景粒子效果
    createParticles();

    // 初始化第一个标签页的内容
    initCharts('tab3');
    initCharts('tab4');
});

// Tab切换功能
function initTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 显示第一个标签页
    tabBtns[0].classList.add('active');
    tabContents[0].classList.add('active');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // 移除所有active类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 添加当前active类
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            // 初始化当前标签页中的图表
            initCharts(tabId);
        });
    });
}

// 初始化页面动画
function initPageAnimations() {
    gsap.from('.main-card', {
        duration: 1,
        scale: 0.95,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.1
    });
}

// 创建背景粒子效果
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;
    container.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = i % 3 === 0 ? '#67E7D0' : i % 3 === 1 ? '#603BBD' : '#FFD700';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.boxShadow = `0 0 ${size * 3}px ${particle.style.background}`;

        const duration = 15 + Math.random() * 30;
        const xOffset = Math.random() * 100 - 50;
        const yOffset = Math.random() * 100 - 50;

        particle.style.setProperty('--x-offset', xOffset);
        particle.style.setProperty('--y-offset', yOffset);
        particle.style.animation = `float ${duration}s linear infinite`;

        container.appendChild(particle);
    }
}

// 初始化图表
function initCharts(tabId) {
    switch (tabId) {

        case 'tab3':
            loadIframeContent('visualization3', './part2-char3.html');
            break;
        case 'tab4':
            loadIframeContent('visualization4', './part2-char4.html');
            break;

    }
}

// 加载iframe内容
function loadIframeContent(containerId, src) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 检查是否已存在iframe
    let iframe = container.querySelector('iframe');

    if (!iframe) {
        // 创建新的iframe
        iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        container.appendChild(iframe);
    } else {
        // 刷新iframe内容
        iframe.src = iframe.src;
    }
}




