<!--Composition API-->
<script setup></script>
<template>
  <div class="banner">
    <div class="parent">
      <v-container>
        <v-row>
          <v-col cols="6">
            <div class="cont">
              <h3><span>Huge Saving</span> on UHD Televisions</h3>
              <p class="hint">Sale up to 70% off on selected items*</p>
              <v-btn
                style="border-radius: 30px; text-transform: none"
                variant="outlined"
                density="compact"
                height="50"
                width="160"
                >Shop Now</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<style scoped lang="scss">
.banner {
  .parent {
    height: 540px;
    background-image: url("../../assets/images/banner-bg.jpg");
    background-size: cover;
    background-position: left top;
    .cont {
      color: #fff;
      padding: 70px 0 0 100px;
      h3 {
        font-size: 45px;
        font-weight: 900;
        span {
          color: rgb(45, 251, 223);
        }
      }
      .hint {
        margin: 50px 0 20px;
      }
    }
  }
}
</style>
