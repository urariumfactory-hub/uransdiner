document.addEventListener('DOMContentLoaded', () => {
    // ページ読み込み時にフェードイン
    document.body.classList.add('fade-in');

    // モバイルメニューのトグル
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });
    }

    // リンククリック時にメニューを閉じる
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        if (menuToggle) {
            menuToggle.classList.remove('is-active');
            navLinks.classList.remove('active');
        }
    }));

    // リンククリック時のフェードアウト
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // ページ内リンクや外部サイト、タブ開きを除く
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && link.target !== '_blank') {
                e.preventDefault();
                document.body.classList.remove('fade-in');

                // フェードアウトのアニメーション時間に合わせて遷移
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // style.cssのtransition時間と合わせる
            }
        });
    });
    // フォーム送信時のフェードアウト
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            document.body.classList.remove('fade-in');

            // フェードアウトのアニメーション時間に合わせて遷移
            setTimeout(() => {
                window.location.href = 'order_confirmation.html';
            }, 500); // style.cssのtransition時間と合わせる
        });
    }

    // URLパラメータから注文内容を自動入力
    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get('order');
    if (orderParam) {
        const typeSelect = document.getElementById('type');
        if (typeSelect) {
            // オプションの値と一致するものを探して選択
            Array.from(typeSelect.options).forEach(option => {
                if (option.value === orderParam) {
                    typeSelect.value = orderParam;
                }
            });
        }
    }
});
