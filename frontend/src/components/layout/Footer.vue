<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-desktop">
        <div class="footer-brand">
          <img :src="logoWhite" alt="iStore" class="footer-logo">
          <p class="brand-description">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h3 class="footer-title">Services</h3>
            <ul class="footer-list">
              <li><a href="#">Bonus program</a></li>
              <li><a href="#">Gift cards</a></li>
              <li><a href="#">Credit and payment</a></li>
              <li><a href="#">Service contracts</a></li>
              <li><a href="#">Non-cash account</a></li>
              <li><a href="#">Payment</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3 class="footer-title">Assistance to the buyer</h3>
            <ul class="footer-list">
              <li><a href="#">Find an order</a></li>
              <li><a href="#">Terms of delivery</a></li>
              <li><a href="#">Exchange and return of goods</a></li>
              <li><a href="#">Guarantee</a></li>
              <li><a href="#">Frequently asked questions</a></li>
              <li><a href="#">Terms of use of the site</a></li>
            </ul>
          </div>
        </div>

        <div class="social-icons">
          <a href="#" class="social-link"><img :src="twitterIcon" alt="Twitter"></a>
          <a href="#" class="social-link"><img :src="facebookIcon" alt="Facebook"></a>
          <a href="#" class="social-link"><img :src="tiktokIcon" alt="TikTok"></a>
          <a href="#" class="social-link"><img :src="instagramIcon" alt="Instagram"></a>
        </div>
      </div>

      <div class="footer-mobile">
        <div class="footer-brand">
          <img :src="logoWhite" alt="iStore" class="footer-logo">
          <p class="brand-description">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h3 class="footer-title">Services</h3>
            <ul class="footer-list">
              <li><a href="#">Bonus program</a></li>
              <li><a href="#">Gift cards</a></li>
              <li><a href="#">Credit and payment</a></li>
              <li><a href="#">Service contracts</a></li>
              <li><a href="#">Non-cash account</a></li>
              <li><a href="#">Payment</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3 class="footer-title">Assistance to the buyer</h3>
            <ul class="footer-list">
              <li><a href="#">Find an order</a></li>
              <li><a href="#">Terms of delivery</a></li>
              <li><a href="#">Exchange and return of goods</a></li>
              <li><a href="#">Guarantee</a></li>
              <li><a href="#">Frequently asked questions</a></li>
              <li><a href="#">Terms of use of the site</a></li>
            </ul>
          </div>
        </div>

        <div class="social-icons">
          <a href="#" class="social-link"><img :src="twitterIcon" alt="Twitter"></a>
          <a href="#" class="social-link"><img :src="facebookIcon" alt="Facebook"></a>
          <a href="#" class="social-link"><img :src="tiktokIcon" alt="TikTok"></a>
          <a href="#" class="social-link"><img :src="instagramIcon" alt="Instagram"></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import logoWhite from '@/assets/images/logo-white.svg'
import twitterIcon from '@/assets/images/twitter.svg'
import facebookIcon from '@/assets/images/facebook.svg'
import tiktokIcon from '@/assets/images/tiktok.svg'
import instagramIcon from '@/assets/images/insta.svg'

export default {
  setup() {
    return {
      logoWhite,
      twitterIcon,
      facebookIcon,
      tiktokIcon,
      instagramIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: $text-dark;
  color: white;
  padding: $gap-xl 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $gap-lg;
  }

  .footer-desktop {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    .footer-brand {
      width: 30%;
      max-width: 300px;
    }

    .footer-links {
      display: flex;
      gap: $gap-xl;
      width: 60%;
    }

    .footer-column {
      flex: 1;
    }

    .social-icons {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      gap: $gap-md;
    }
  }

  .footer-mobile {
    display: none;
    flex-direction: column;
    gap: $gap-xl;

    .footer-brand {
      text-align: center;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: $gap-lg;
    }

    .social-icons {
      display: flex;
      justify-content: center;
      gap: $gap-md;
      margin-top: $gap-lg;
    }
  }

  .footer-logo {
    width: 120px;
    height: auto;
    margin-bottom: $gap-md;
  }

  .brand-description {
    color: $text-light;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: $gap-xl;
  }

  .footer-title {
    font-size: 18px;
    margin-bottom: $gap-md;
    font-weight: 500;
  }

  .footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $gap-sm;

    a {
      color: $text-light;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s;

      &:hover {
        color: white;
      }
    }
  }

  .social-link img {
    width: 24px;
    height: 24px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    .footer-desktop {
      display: none;
    }

    .footer-mobile {
      display: flex;
    }

    .footer-title {
      font-size: 16px;
      text-align: center;
    }

    .footer-list {
      align-items: center;
    }

    .footer-links {
      align-items: center;
    }

    .brand-description {
      margin-bottom: $gap-lg;
    }
  }
}
</style>