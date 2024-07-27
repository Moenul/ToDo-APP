<template>
    <div class="nav d-block card p-3 mt-5">
        <div class="use_info d-inline-block">
          <div class="row">
            <div class="profile_image">
              <img class="rounded-circle border border-info shadow-sm" style="width: 54px; overflow: hidden;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlCLUUa5t9Q5fC3sR8353U21-qY5qUt0i_pA&s" alt="">
            </div>
            <div class="profile_desc">
              <p class="m-0">User Full Name</p>
              <span class="text-muted" style="font-size: 16px;">moenul22@gmail.com</span>
            </div>
          </div>
        </div>
        <div class="button text-danger m-0">
          <iconify-icon icon="lets-icons:on-button-duotone"></iconify-icon>
        </div>

        <div class="todo_info d-block mt-2">
          <div class="row">
            <div class="col-2 d-inline-flex"><iconify-icon class="text-success" icon="weui:done2-filled" style="font-size: 23px; margin-right: 4px;"></iconify-icon> 10</div>
            <div class="col-2 d-inline-flex"><iconify-icon class="text-warning" icon="fluent:calendar-clock-16-filled" style="font-size: 23px; margin-right: 4px;"></iconify-icon> 5</div>
            <div class="col-8 d-inline-flex"><iconify-icon class="text-primary" icon="majesticons:clock" style="font-size: 23px; margin-right: 4px;">
              
            </iconify-icon> {{ vDateTime(Date.now(), "DD MMM YYYY") }}</div>
          </div>
        </div>
    </div>
    
    <!-- if not sign in -->
    <!-- <div class="nav d-block card p-3 m-4 mt-5">
    <span class="title">SignIn to add task</span>
    <div class="button text-info">
        <iconify-icon icon="lets-icons:on-button-duotone"></iconify-icon>
    </div>
    </div> -->
    <!-- if not sign in -->
</template>

<script setup>
import { vDateTime } from "@/directives/vDateTime";
</script>

<style scoped>
/* Nav section */
.use_info{
  width: calc(100% - 40px);
}
.use_info .profile_image{
  width: 65px;
}
.use_info .profile_desc{
  width: calc(100% - 65px);
}
.nav{
  border-radius: 15px;
    border: 1px solid #e4e4e4;
    box-shadow: 0 0 0 0.2rem rgb(214 214 214 / 17%);
}
.nav .todo_info{
  font-size: 16px;
}
.nav .title{
  width: 85%;
  display: inline-block;
}
.nav .button{
  width: 40px;
  float: right;
  font-size: 38px;
  margin-top: -10px;
  cursor: pointer;
}

</style>