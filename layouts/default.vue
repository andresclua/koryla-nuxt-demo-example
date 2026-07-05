<template>
  <div>
    <nav class="nav">
      <a href="/" class="nav__brand">
        <span class="nav__brand-name">Koryla</span>
        <span class="nav__brand-sep">·</span>
        <span class="nav__brand-sub">Nuxt Demo</span>
      </a>
      <div class="nav__links">
        <a href="/pricing">Pricing</a>
        <a href="/hero" class="nav__link--orange">Layout demo</a>
        <a href="/demo-sdk" class="nav__link--indigo">SDK</a>
        <a href="/demo-edge" class="nav__link--orange">Edge</a>
        <a href="/demo-combined" class="nav__link--green">Combined</a>
        <a href="/thank-you" class="nav__cta">Get started</a>
      </div>
    </nav>
    <slot />
  </div>
</template>
