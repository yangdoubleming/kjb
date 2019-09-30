<template>
  <div v-if="!item.hidden&&item.list" class="menu-wrapper">

      <el-submenu :index="item.title||item.class">
        <template slot="title">
          <i :class="item.icon"></i>
          <span v-if="item.title" slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.list" >
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.list&&child.list.length>0" :item="child" :key="child.name" :base-path="resolvePath(item.class)"></sidebar-item>
          <router-link v-else :to="resolvePath(`${item.class}/${child.url}`)" :key="child.name">
            <el-menu-item :index="resolvePath(`${item.class}/${child.url}`)">
                <i :class="child.icon"></i>
              <span v-if="child.name" slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
  </div>
</template>

<script>
import path from "path";

export default {
    name: "SidebarItem",
    props: {
        // route配置json
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            onlyOneChild: null
        };
    },
    methods: {
        resolvePath(...paths) {
            return path.resolve(this.basePath, ...paths);
        }
    }
};
</script>

<style scoped>
.fontcontainer{
    padding-right:10px;
}
</style>

