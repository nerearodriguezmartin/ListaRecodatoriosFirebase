<template lang="html">

  <section class="cabecera">
    <h1>{{titulo | capitalice}}</h1>

  </section>

</template>

<script lang="js">

  export default  {
    name: 'cabecera',
    props: ["ejemplo"],
    mounted () {

    },
    data () {
      return {
        titulo: "ejercicio lista de recordatorios"
      }
    },
    methods: {

    },

    filters: {
      capitalice: function(valor)
      {
        return (valor[0].toUpperCase()+valor.slice(1));
      }
    }, 


    computed: {

    }
}


</script>

<style scoped >
  .cabecera {
    color: white;
  }
</style>
