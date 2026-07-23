const tabs = document.querySelectorAll('.tab');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navigation.classList.remove('open')));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!prefersReducedMotion && hasFinePointer) {
  document.querySelectorAll('.tilt-3d').forEach(card => {
    const strength = card.classList.contains('tilt-hero') ? 4 : 7;
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.setProperty('--tilt-x', `${-y * strength}deg`);
      card.style.setProperty('--tilt-y', `${x * strength}deg`);
      card.style.setProperty('--glow-x', `${(x + .5) * 100}%`);
      card.style.setProperty('--glow-y', `${(y + .5) * 100}%`);
      card.classList.add('is-tilting');
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.classList.remove('is-tilting');
    });
  });
}
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  const area = tab.dataset.area;
  document.querySelectorAll('[data-rural]').forEach(price => price.textContent = price.dataset[area]);
}));

document.querySelectorAll('a[href="#contact"]').forEach(link => link.addEventListener('click', () => {
  const packageName = link.closest('.package')?.querySelector('h3')?.textContent.trim();
  if (packageName) document.querySelector('[name="package"]').value = packageName.includes('GIGA') ? 'GIGA / SKY' : packageName;
}));

document.querySelector('#lead-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  const result = form.querySelector('.success');
  const originalLabel = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = 'Đang gửi thông tin...';
  result.textContent = '';
  result.classList.remove('error');

  try {
    const response = await fetch('https://formspree.io/f/mpqvjbdw', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Lead submission failed');
    result.textContent = 'Cảm ơn bạn! FPT sẽ liên hệ tư vấn trong thời gian sớm nhất.';
    form.reset();
  } catch (error) {
    result.textContent = 'Chưa thể gửi thông tin. Vui lòng gọi ngay 0358513269 hoặc 0383 900 321 để được hỗ trợ.';
    result.classList.add('error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});
