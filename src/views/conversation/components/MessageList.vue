<template>
  <div class="message-wrapper" :class="messagePosition">
    <p class="text-time">2022.09.22</p>
    <div
      class="c2c-layout"
      :class="messagePosition"
    >
      <div class="col-1">
        <!-- 头像 -->
        <user-avatar :is-doctor="!isMine" :src="props.message.avatar" />
      </div>
      <div class="col-2">
        <!-- 消息主体 -->
        <div class="content-wrapper">
          <!-- relation 是否是发送方 0 表示患者发送给医生 -->
          <li :class="{ 'right-message': isMine && immessage.payload.type!=10002, 'left-message': !isMine && immessage.payload.type!=10002 }">
            <div :class="immessage.payload.type == 2 ? '':'m-content'">
              <!-- 医嘱提醒 -->
              <section v-if="immessage.payload.type==1 && immessage.payload.exd" class="leftDoctorSay">
                <h3>医嘱提醒</h3>
                <h5>{{ immessage.payload.sendTime }}</h5>
                <p>你好!</p>
                <p>
                  医生：{{ immessage.payload.content.doctorName }}{{ immessage.payload.content.doctorTitle?'-'+immessage.payload.content.doctorTitle:'' }}{{ immessage.payload.content.hospitalName?'-'+immessage.payload.content.hospitalName:'' }}</p>
                <pre>{{ immessage.payload.content.content? `医嘱内容：${immessage.payload.content.doctorsSummary}` : '' }}</pre>
              </section>
              <span v-else-if="[1, 128].includes(immessage.payload.type)">{{ immessage.payload.content }}</span>
              <div v-else-if="immessage.payload.type==2" class="chatImg">
                <image-element :message="immessage" :is-mine="isMine" :payload="immessage.payload" />
                <!-- <img
                  name="zoomimg"
                  :src="immessage.payload.content.path.indexOf('http') > -1 ? immessage.payload.content.path : baseUrl+immessage.payload.content.path"
                > -->
              </div>
              <div v-else-if="immessage.payload.type==4" style="padding-right: 10px;">
                <sound-element
                  :is-mine="isMine"
                  :payload="immessage.payload"
                  :message="immessage"
                />
                <!-- <audio class="aaa" preload="auto" name="audio-r" controls>
                  您的浏览器不支持 audio 元素。
                  <source type="audio/mp3" :src="immessage.payload.content.path">
                </audio>
                <p class="seconds" name="seconds">{{ immessage.payload.content.timeLength }}&quot;</p> -->
              </div>
              <div v-else-if="immessage.payload.type==8">[视频]</div>
              <div v-else-if="immessage.payload.type==16 && isMine">
                <br>
                <p v-for="(childItem, childIndex) in immessage.payload.content.items" :key="childIndex">{{ childItem.productName }}</p>
                <p>
                  <a :href="immessage.payload.content.orderUrl" class="one-key-buy-btn">立即下单</a>
                </p>
              </div>
              <div v-else-if="immessage.payload.type == 16 && !isMine">
                <span>{{ immessage.payload.content.doctorName }}医生：建议您服用以下药物：</span>
                <br>
                <div v-for="(childItem,childIndex) in immessage.payload.content.items" :key="childIndex">
                  <br>
                  <p>
                    {{ childItem.productName }}X{{ childItem.quantity }}{{ childItem.usage!=null&&childItem.usage!='' ? ','+childItem.usage : '' }}{{ childItem.bakup!=null&&childItem.bakup!='' ? ','+childItem.bakup :'' }}
                  </p>
                </div>
                <p>
                  <a href="javascript:void(0);" class="one-key-buy-btn chachufang prescription" @click="handelPrescription(immessage.payload.content.recommandId)">查看处方</a>
                </p>
                <p v-if="immessage.payload.content.discountAt" class="lm-content-msg">互联网医院提醒您，此次下单您可以《享受五折优惠，最高优惠100元》，购买截止时间至《
                  <span>{{ immessage.payload.content.discountAt }}</span>》，复制转发无效。如果您本月已参与此次活动，则不再享有五折购药优惠。</p>
              </div>
              <span v-else-if="immessage.payload.type == 32" v-html="immessage.payload.content.dest" />
              <p v-else-if="immessage.payload.type == 64">
                我向医生咨询的药品:
                <br>
                <span v-for="(childItem, childIndex) in immessage.payload.content.items" :key="childIndex">{{ childItem.productName }}X{{ childItem.quantity }}</span>
                <br>
              </p>
              <span v-else-if="immessage.payload.type == 1024">{{ immessage.payload.content.detail }}</span>
              <span v-else-if="immessage.payload.type == 10006">{{ immessage.payload.content.title }}</span>
              <div v-else-if="immessage.payload.type == 256 && !isMine">
                <span>{{ immessage.payload.content.record }}</span>
                <div v-for="(childItem,childIndex) in immessage.payload.content.images" :key="childIndex" class="doc-img">
                  <image-element :message="immessage" :is-mine="isMine" :payload="immessage.payload" />
                  <!-- <img name="zoomimg" :src="childItem"> -->
                </div>
              </div>
              <a v-else-if="immessage.payload.type == 512 && isMine" :href="'./visit.html#visit%2C%5B%7B%22visitId%22%3A%22' + immessage.payload.content.visitId + '%22%2C%22orderId%22%3A%22' + immessage.payload.content.orderId + '%22%7D%5D'">
                <section class="curativePa" :data-visitId="immessage.payload.content.visitId" :data-orderId="immessage.payload.content.orderId">
                  <header>疗效随访表反馈</header>
                  <section class="curative-secPa">
                    <img class="curative-secPaL" src="../../../assets/image/work/curative-pa.png" alt="">
                    <p class="curative-secPaR">{{ immessage.payload.content.viewMessage }}</p>
                  </section>
                </section>
              </a>
              <div v-else-if="immessage.payload.type == 10001 && !isMine">
                <span>{{ immessage.payload.content.doctorName }}医生：建议您做以下检查：</span>
                <br>
                <p>既往病史：{{ immessage.payload.content.anamnesis?immessage.payload.content.anamnesis:'无' }}；</p>
                <p>病理及体征：{{ immessage.payload.content.symptoms?immessage.payload.content.symptoms:'无' }}；</p>
                <p>相关检查结果：{{ immessage.payload.content.relatedExamine?immessage.payload.content.relatedExamine:'无' }}；</p>
                <p>临床诊断：{{ immessage.payload.content.diagnosis?immessage.payload.content.diagnosis:'无' }}；</p>
                <p>【检查项目】</p>

                <p v-for="(childItem,childIndex) in immessage.payload.content.items" :key="childIndex">{{ childIndex+1 }}.{{ childItem.examineName }}</p>
                <p>
                  <a class="one-key-buy-btn checkOrder" :state="immessage.payload.content.serialNumber">立即下单</a>
                </p>
                <p>既往病史：{{ immessage.payload.content.anamnesis?immessage.payload.content.anamnesis:'无' }}；</p>
              </div>
              <section v-else-if="immessage.payload.type==4096 && !isMine" class="leftSex">
                <h3>{{ immessage.payload.content.doctorName }}医生推荐您关注以下服务</h3>
                <h5>{{ immessage.payload.sendTime }}</h5>
                <section class="leftDoctorRead1" :data-productid="immessage.payload.content.productId">
                  <span class="leftDoctorProductName">{{ immessage.payload.content.productName }}</span>
                  <b class="leftDoctorPrice">&nbsp;&nbsp;{{ immessage.payload.content.price/100 }}元</b>
                </section>
              </section>
              <section v-else-if="immessage.payload.type==10007 && !isMine" class="leftSex">
                <p>{{ immessage.payload.content.content }}</p>
                <section class="flex">
                  <router-link
                    :to="`/complaint/${immessage.payload.content.doctorId}/${immessage.payload.content.consultSessionId}?type=${immessage.payload.content.consultType}&share_status=hide`"
                    class="chachufang"
                  >
                    【投诉】
                  </router-link>
                  <router-link
                    :to="`/comment/${immessage.payload.content.doctorId}/${immessage.payload.content.consultSessionId}?type=${immessage.payload.content.consultType}&share_status=hide`"
                    class="chachufang"
                  >
                    【满意度调查】
                  </router-link>
                </section>
              </section>
              <section v-else-if="[10005, 2048].includes(immessage.payload.type) && !isMine" class="leftDoctorSay">
                <h3>医嘱提醒</h3>
                <h5>{{ format(immessage.payload.sendTime, 'yyyy年MM月dd日 hh:mm:ss') }}</h5>
                <p>你好!</p>
                <p>
                  医生：{{ immessage.payload.content.doctorName }}{{ immessage.payload.content.doctorTitle ? '-' + immessage.payload.content.doctorTitle:'' }}{{ immessage.payload.content.hospitalName ? '-'+immessage.payload.content.hospitalName:'' }}
                </p>
                <pre>{{ immessage.payload.content.doctorsSummary ? ('医嘱内容：' + immessage.payload.content.doctorsSummary) : ('医嘱内容：' + immessage.payload.content.eduTitle) }}</pre>
                <router-link :to="`/recordDetails/${immessage.payload.content.medicalRecordId}`" class="leftDoctorRead">
                  阅读全文
                </router-link>
              </section>
              <i />
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>