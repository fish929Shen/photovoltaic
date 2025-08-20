
document.addEventListener('DOMContentLoaded', function () {
    // 卡牌数据
    const cards = [
        {
            id: 'shield',
            title: '政策护盾',
            fullTitle: '政策护盾：全方位守护',
            icon: '🛡️',
            desc: '全方位守护光伏产业发展',
            name: '政策扶持护盾',
            function: '从法律层面锁定"全额收购可再生能源电力"，让光伏电不愁销路。还推行"多退少补"机制，让企业收益与市场挂钩，更有针对性地解决弃电和贸易壁垒问题。',
            effect: '西藏那曲光伏电站因"源网荷储"一体化政策，弃电率从31.4%直降至15%；2024年，40%的中国光伏组件经东南亚转口，成功绕开美国关税壁垒。同时，光伏扶贫政策让河北阜平贫困户年均增收3000元，成为他们的"阳光存折"。'
        },
        {
            id: 'chip',
            title: 'AI加速芯片',
            fullTitle: 'AI加速芯片：效率飙升',
            icon: '💾',
            desc: '效率飙升的智能解决方案',
            name: 'AI智能加速芯片',
            function: '为光伏运维和并网赋能。',
            effect: '在青海光伏电站，华为AI视觉识别系统将组件故障检出率从70%提升到98%；南方电网深圳利用AI负荷预测模型，使电网接纳光伏电能力提升35%，浙江分布式光伏并网等待时间从60天缩至7天。在细节优化上，海博思创算法让光伏功率预测精度达92%，储能电站收益涨25%；协鑫科技AI质检把硅片缺陷检出率做到99.9%，每片硅片成本降3分钱。'
        },
        {
            id: 'skill',
            title: '企业技能树',
            fullTitle: '企业技能树：强势升级',
            icon: '🌳',
            desc: '强势升级的技术与协作',
            name: '技术革新与协同共生',
            function: '加大企业研发投入，企业间联合制定自律公约，不再打价格战，而是携手开拓市场，聚焦细分领域，共同做精技术、做大市场。',
            effect: '隆基绿能投入200亿元研发HJT电池，转换效率突破27%，发电量比传统电池多10%；阳光电源专注"光伏+储能"系统，产品畅销150个国家，在沙特让弃电率从20%降至5%。'
        },
        {
            id: 'energy',
            title: '民众能量核心',
            fullTitle: '民众能量核心：汇聚希望',
            icon: '⚡',
            desc: '汇聚希望的全民力量',
            name: '民众支持能量核心',
            function: '民众支持是光伏发展最强大的能量来源。民众的力量，源源不断地为光伏发展注入能量。',
            effect: '甘肃下岗女工党菊珍27年跑遍100多个村庄，助力偏远牧区用上光伏电；上海退休教师王阿姨通过抖音科普光伏知识；95后工程师小林扎根新疆光伏基地，借助AI巡检机器人将运维效率提高3倍。'
        }
    ];

    const spinContainer = document.getElementById('spin-container');
    const infoPanel = document.getElementById('infoPanel');
    const backBtn = document.getElementById('backBtn');
    const dragContainer = document.getElementById('drag-container');

    let isCardSelected = false;
    let selectedCard = null;
    let originalTransform = '';

    // 创建卡牌
    function createCards() {
        spinContainer.innerHTML = '';

        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.id = card.id;

            // 计算卡牌位置 (3D圆形排列，统一正面朝向)
            const angle = (index / cards.length) * Math.PI * 2;
            const radius = 400; // 增大半径，让卡牌离边缘更远
            const xPos = Math.sin(angle) * radius;
            const zPos = -Math.cos(angle) * radius;

            // 让所有卡牌正面朝向中心，但AI加速芯片和民众能量核心需要翻转
            let faceAngle = angle + Math.PI;
            if (card.id === 'chip' || card.id === 'energy') {
                faceAngle += Math.PI; // 翻转180度
            }
            cardElement.style.transform = `translateX(${xPos}px) translateZ(${zPos}px) rotateY(${faceAngle}rad)`;

            // 卡牌正面
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.innerHTML = `
    <div class="card-icon">${card.icon}</div>
    <h3 class="card-title">${card.title}</h3>
    <p class="card-desc">${card.desc}</p>
    `;

            // 卡牌背面
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.innerHTML = `
    <h3 class="card-title">${card.title}</h3>
    <p class="card-desc">${card.desc}</p>
    `;

            // 卡牌名称标签
            const nameTag = document.createElement('div');
            nameTag.className = 'card-name-tag';
            nameTag.textContent = card.fullTitle;

            cardElement.appendChild(cardFront);
            cardElement.appendChild(cardBack);
            cardElement.appendChild(nameTag);
            spinContainer.appendChild(cardElement);

            // 添加点击事件
            cardElement.addEventListener('click', () => selectCard(card, cardElement));
        });
    }

    // 选择卡牌
    function selectCard(card, cardElement) {
        if (isCardSelected) return;

        isCardSelected = true;
        selectedCard = cardElement;
        originalTransform = cardElement.style.transform;

        // 停止旋转动画
        spinContainer.style.animationPlayState = 'paused';

        // 添加选中类名，触发入场动画
        cardElement.classList.add('selected');

        // 更新信息面板
        infoPanel.innerHTML = `
    <div class="panel-status-bar"></div>
    <div class="panel-corner top-left"></div>
    <div class="panel-corner top-right"></div>
    <div class="panel-corner bottom-left"></div>
    <div class="panel-corner bottom-right"></div>
    <div class="panel-header">
        <div class="panel-icon">${card.icon}</div>
        <h2 class="panel-title">${card.fullTitle}</h2>
    </div>
    <div class="panel-subtitle">【名称】${card.name}</div>
    <div class="panel-content">
        <div class="panel-subtitle">【功能介绍】</div>
        <p>${card.function}</p>
    </div>
    <div class="panel-effect">
        <div class="effect-title">【使用效果】</div>
        <p>${card.effect}</p>
    </div>
    <div class="rarity-badge">传说</div>
    `;

        // 显示信息面板和返回按钮
        setTimeout(() => {
            infoPanel.classList.add('active');
            backBtn.classList.add('active');
        }, 300);

        // 其他卡牌淡出
        document.querySelectorAll('.card').forEach(cardEl => {
            if (cardEl.id !== card.id) {
                cardEl.style.opacity = '0.3';
                cardEl.style.pointerEvents = 'none';
                cardEl.style.transform += ' scale(0.8)';
            }
        });
    }

    // 返回卡牌轮盘
    function backToCarousel() {
        if (!isCardSelected) return;

        // 移除选中类名
        selectedCard.classList.remove('selected');

        // 恢复选中卡牌位置
        selectedCard.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        selectedCard.style.transform = originalTransform;
        selectedCard.style.zIndex = '';

        // 隐藏信息面板和返回按钮
        infoPanel.classList.remove('active');
        backBtn.classList.remove('active');

        // 恢复其他卡牌
        document.querySelectorAll('.card').forEach(cardEl => {
            cardEl.style.opacity = '1';
            cardEl.style.pointerEvents = 'all';
            cardEl.style.transform = cardEl.style.transform.replace(' scale(0.8)', '');
        });

        // 重新开始旋转动画
        setTimeout(() => {
            spinContainer.style.animationPlayState = 'running';
        }, 1000);

        isCardSelected = false;
        selectedCard = null;
    }

    // 初始化
    createCards();
    backBtn.addEventListener('click', backToCarousel);

    // 添加鼠标拖拽旋转效果
    let isDragging = false;
    let startX, startY;
    let rotationX = -15;
    let rotationY = 0;

    dragContainer.addEventListener('mousedown', (e) => {
        if (isCardSelected) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || isCardSelected) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        rotationY += deltaX * 0.2;
        rotationX = Math.max(-30, Math.min(10, rotationX - deltaY * 0.1));

        dragContainer.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // 触摸设备支持
    dragContainer.addEventListener('touchstart', (e) => {
        if (isCardSelected) return;

        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging || isCardSelected) return;

        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        rotationY += deltaX * 0.2;
        rotationX = Math.max(-30, Math.min(10, rotationX - deltaY * 0.1));

        dragContainer.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        e.preventDefault();
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
});
