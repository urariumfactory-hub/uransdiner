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
    // フォーム送信時のフェードアウト (Formspree連携)
    const form = document.querySelector('#contact-form');
    const formInputs = document.querySelector('#form-inputs');
    const confirmContainer = document.querySelector('#confirm-container');
    const nextBtn = document.querySelector('#next-to-confirm');
    const backBtn = document.querySelector('#back-to-edit');

    if (form) {
        // 次へ（確認画面）へ
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                // 基本的なバリデーション
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                // 入力内容を確認画面に反映
                document.getElementById('confirm-name').innerText = document.getElementById('name').value;
                document.getElementById('confirm-email').innerText = document.getElementById('email').value;
                document.getElementById('confirm-type').innerText = document.getElementById('type').value;
                document.getElementById('confirm-message').innerText = document.getElementById('message').value;

                // 切り替え
                formInputs.style.display = 'none';
                confirmContainer.style.display = 'block';
                window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
            });
        }

        // 戻る（編集画面）へ
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                confirmContainer.style.display = 'none';
                formInputs.style.display = 'block';
            });
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 送信ボタンを無効化（二重送信防止）
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
            }

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // 送信成功時：フェードアウトのアニメーションを実行して遷移
                    document.body.classList.remove('fade-in');
                    setTimeout(() => {
                        window.location.href = 'order_confirmation.html';
                    }, 500);
                } else {
                    alert('送信に問題が発生しました。後でもう一度お試しください。');
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerText = 'Place Order';
                    }
                }
            } catch (error) {
                alert('エラーが発生しました。インターネット接続を確認してください。');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Place Order';
                }
            }
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
