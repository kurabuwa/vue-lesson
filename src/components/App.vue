<template>
  <div>
    <h1 v-html="leads.message"
        :class="classObject"></h1>
    <p>{{ leads.description }}</p>
    <button @click="addDescription">
      addDescription
    </button>
    <hr>

    <child-component
      v-if="isShow">
      <template #head>
        <p>head slot</p>
      </template>
      <p>main slot</p>
      <template #foot>
        <p>foot slot</p>
      </template>
    </child-component>
    <button @click="toggleShow">toggle isShow</button>
    <hr>

    <p v-if="id === 1">1</p>
    <template v-else-if="id === 2">
      <p>2-1</p>
      <p>2-2</p>
      <p>2-3</p>
    </template>
    <p v-else>other</p>
    <hr>

    <ul>
      <template v-for="item in items">
        <child-component
        :key="item.id"
        :title="item.title">
          <span>slot content</span>
        </child-component>
      </template>
      <hr>

      <button @click="incrementCount">Add to count</button>
      <!-- <p>{{ count }}回クリックしました</p> -->
      <hr>
      <form>
        <div>
          <span>名前:</span>
          <input-text v-model="form.name"></input-text>
          <p>名前:{{getInputName}}</p>
        </div>
        <div>
          <span>性別:</span>
          <label>
            男性
            <input type="radio" value="male" v-model="form.sex">
          </label>
          <label>
            女性
            <input type="radio" value="female" v-model="form.sex">
          </label>
          <p>性別: {{ getRadioValue }}</p>
        </div>
        <div>
          <select v-model="form.selected">
          <option disabled value="">--出身地を選択してください--</option>
          <option v-for="option in form.options"
            :value="option.value"
            :key="option.id">
              {{ option.value }}
            </option>
          </select>
          <p>出身地:{{ getSelectValue }}</p>
        </div>
        <div>
          <label>
            <input type="checkbox" v-model="form.checked">
            20際以上です
          </label>
          <p>チェックボックス: {{ getCheckBoxValue }}</p>
        </div>
      </form>
      <hr>
      <counter></counter>
      <hr>
      <input type="text" v-model="inputText">
      <p>computed: {{ getUpperCaseText }}</p>
      <p>methods: {{ showUpperCaseText() }}</p>
      <hr>

      <template v-for="category in categories">
        <p :key="$uuid.v4()">
          {{category}}
        </p>
      </template>
      <button @click="updateText">update text</button>
      <hr>

      <article v-for="post in posts" :key="$uuid.v4()">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </article>
      <hr>
    </ul>
  </div>
</template>

<script>
  import ChildComponent from 'Components/ChildComponent';
  import Counter from 'Components/Counter';
  import InputText from 'Components/InputText';
  import axios from 'axios';

  export default {
    beforeCreate() {
      console.log('beforecreate');
      console.log(this.leads); //undefined
    },
    created() {
      console.log('created');
      console.log(this.posts);
      axios.get('/data.json').then(res => {
        this.posts = res.data.posts;
      });
    },
    beforeMount() {
      console.log("beforemount");
      console.log(this.$el);//undefined
    },
    mounted() {
      console.log('mounted');
      console.log(this.$el);
    },
    beforeUpdate() {
      console.log('beforeupdate');
    },
    updated() {
      console.log('updated');
    },
    data() {
      return {
        leads: {
          message: '<span>Hello Vue</span>',
          description:'',
        },
        classObject: {
          'is-green':true,
        },
        isShow:true,
        id:2,
        inputText:'',
        items:[
          {
            id: this.$uuid.v4(),
            title: '1番目のリスト'
          },
          {
            id: this.$uuid.v4(),
            title:'2番目のリスト'
          },
          {
            id: this.$uuid.v4(),
            title:'3番目のリスト'
          }
        ],
        form:{
          name: "",
          sex: "",
          selected: "",
          options: [
            {
              id: this.$uuid.v4(),
              value: '東京都',
            },
            {
              id: this.$uuid.v4(),
              value: '埼玉県',
            },
            {
              id: this.$uuid.v4(),
              value: '神奈川県',
            },
            {
              id: this.$uuid.v4(),
              value: '千葉県',
            },
          ],
          checked: false,
        },
        categories:['Javascript', 'jQuery'],
        posts: [],
      }
    },
    methods:{
      incrementCount(){
        this.count++;
      },
      showUpperCaseText(){
        const upperCaseText = this.inputText.toUpperCase();
        // console.log(`methods:${upperCaseText}`);
        return upperCaseText;
      },
      addDescription(){
        this.leads.description = 'Vur-lesson';
        // console.log(this.description);
      },
      changeTextSize(){
        this.classObject = Object.assign({},this.classObject,{
          'is-large':true,
        });
      },
      toggleShow() {
        this.isShow = !this.isShow;
      },
      updateText(){
        this.$set(this.categories, 1, 'Vue.js');
      },
    },
    computed:{
      getUpperCaseText(){
        const upperCaseText = this.inputText.toUpperCase();
        // console.log(`computed:${upperCaseText}`);
        return upperCaseText;
      },
      getInputName(){
        return this.form.name;
      },
      getRadioValue(){
        return this.form.sex;
      },
      getSelectValue() {
        return this.form.selected;
      },
      getCheckBoxValue() {
        return this.form.checked;
      }
    },
    components: {
      ChildComponent,
      Counter,
      InputText,
    },
    watch: {
      inputText(value, oldvalue){
        console.log(`value -> ${value}`);
        console.log(`oldvalue -> ${oldvalue}`);
      },
      leads: {
        handler(){
          console.log('add didscription');
        },
        deep: true,
      }

    }
  }
  /*確認項目
  ・コンポーネントとは
    それぞれのソフトウェアやシステムなどの部品や要素のことである。また、webブロントエンドではページの要素を再利用可能な部品（コンポーネント）にとして分割し、それを組み合わせてページを作り上げて行く手法をコンポーネント指向という。
  ・methodsとは
    Vueインスタンスないでメソッドを定義しておく場所
  ・computedとは、methodsとの違い
    computedは算出プロパティで依存しているリアクティブプロパティに変更があった際に実行される。また、methodsとの違いはメソッド内で使っていないリアクティブなプロパティを変更した際、methodsだと実行されてしまうがcomputedだと実行されないところである。これはメソッド呼び出し(methods)の場合再描画が発生してしまうためである。
  ・propsとは、指定方法の種類（配列、オブジェクト => 文字列、オブジェクト）
    親のコンポーネントを子のコンポーネントに渡すときに使う。指定方法には配列とオブジェクトの２種類が存在する。オブジェクトの指定ではより細かい指定が可能でporosはオブジェクト形式でより詳細に定義するべきで、少なくともtypeは指定することは推奨されている。
  ・dataとは、追加、変更
    vueインスタンスが保持することができるプロパティを定義しておくことができるメソッドである。ここで定義されたプロパティはリアクティブなプロパティとなる。仕組み上Vueインスタンス化された後にリアクティブプロパティを追加することはできない。また、String,Number,boolean型では代入することにより変更が可能だが配列ではインデックスに対して直接指定する場合代入できない。新しい配列を代入することで変更が可能となる。オブジェクトではOblect.assign()などを使うことによって動的に追加は可能である。
  ・watchとは
    data内の値の変更を監視して変更されたときに実行したい処理を定義することができる。メソッド名には監視したいdataのプロパティ名を指定。第一引数には現在の値、第２引数には前回の値を受け取ることができる。
  ・v-model
    form部品のinputタグやselectタグのバインディングに使われる。
  ・emit
    子のコンポーネントで発火したイベントで親のdataを書き換えたい場合に使われる。$emit()の第一引数には発火させたいイベント名を指定する。
  */
</script>

<style scoped>
  .is-green {
    color: green;
  }
  .is-large{
    font-size: 48px;
  }
  hr {
    margin: 16px 0;
  }
</style>
