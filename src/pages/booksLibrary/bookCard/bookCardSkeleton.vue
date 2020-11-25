<template>
   <div style="max-width: 435px;min-width: 435px; margin: 10px;" class="d-flex align-center flex-grow-0 flex-shrink-0">
      <div class="d-flex flex-column jusitfy-center">
         <div class="d-flex align-center">
            <v-skeleton-loader height="218px" width="144px" type="image"/>
         </div>
      </div>
      <div style="height:100%" class="d-flex flex-column flex-grow-1 flex-shrink-1 ps-10 justify-space-between py-4">
         <div>
            <v-skeleton-loader type="heading"/>
            <v-skeleton-loader class="pt-5" type="paragraph"/>
         </div>
         <div class="d-flex justify-end pe-4">
            <v-skeleton-loader type="button"/>
         </div>
      </div>
   </div>
</template>