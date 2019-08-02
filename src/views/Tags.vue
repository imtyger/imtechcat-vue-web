<template>
  <div>
    <div class="content">
      <div class="tag-list" v-for="tags in tagList">
        <router-link :to="{ path:'/tags/post/'+ tags.tagName }">
          <li class="tag-list-item">
            <a class="tag-list-link">{{ tags.tagName }}</a>
            <span class="tag-list-count">{{ tags.count }}</span>
          </li>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTags } from '../api/tag'

  export default {
    data () {
      return {
        tagList: {}
      }
    },
    mounted () {
      this.getTagList()
    },
    methods: {
      async getTagList () {
        const data = await getTags ()
        this._formatList(data)
      },
      _formatList(data) {
        this.tagList = data.data.list
      },
    }
  }
</script>

<style scoped>
  .content {
    margin: 10px 180px 10px 180px;
    padding: 20px;
  }

  .tag-list {
    line-height: 20px;
    display: inline-block;
    height: 20px;
    margin: 3px;
    padding: 0 10px;
    color: #555;
    border-radius: 3px;
    background: #f6f6f6;
    min-width: 30px;
    font-size: 14px;
    text-align: center;
  }

  .tag-list-item {
    list-style-type: none;
  }

  .tag-list-item a {
    color: #555;
  }

  .tag-list-item:hover {
    color: #555;
    background: #efefef;
  }

  .tag-list-link {
    font-weight: 500;
    margin-right: 5px;
  }

  .tag-list-count {
    padding-left: 0.5rem;
    color: #2196F3;
  }
</style>
