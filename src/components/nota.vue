<template lang="html">

  <section class="nota">



<b-container  class="bv-example-row">
  <b-row align-v="center" v-bind:class="{completado: nota.completado}">
    <b-col cols="1" v-on:click="cambioEstado">
      <b-icon v-if="nota.completado" icon="check-circle" scale="0.7" variant="success"></b-icon>
      <b-icon v-if="!nota.completado" icon="circle" scale="0.7"></b-icon>
    </b-col>
    <b-col cols="9"><h1>{{nota.titulo | capitalice}}</h1></b-col>
    <b-col cols="2"><b-icon v-on:click="borraTarea" icon="dash-circle-fill"  scale="0.65" variant="" class="icon"
    ></b-icon></b-col> 

    <!-- v-on:click="borrarTarea"-->
  </b-row>

  <b-row align="flex-start" >
    <b-col class="prioridad">
      <p>
        Prioridad: 
          <b-button  size="sm" v-if="nota.prioridad==1" variant="info">
          <b-icon icon="chevron-right" scale="0.5" rotate="90"></b-icon>
          Low
          </b-button>
          <b-button  v-on:click="cambiaPrioridad(1)" size="sm" v-if="nota.prioridad!=1">
          <b-icon icon="chevron-right" scale="0.5" rotate="90"></b-icon>
          Low
          </b-button>

          <b-button v-if="nota.prioridad==2" size="sm" variant="primary">Normal</b-button>
          <b-button v-on:click="cambiaPrioridad(2)" v-if="nota.prioridad!=2" size="sm" >Normal</b-button>

          <b-button v-on:click="cambiaPrioridad(3)" v-if="nota.prioridad!=3" size="sm">High<b-icon icon="chevron-right" scale="0.5" rotate="270"></b-icon></b-button>
          <b-button v-if="nota.prioridad==3" size="sm" variant="danger">High<b-icon icon="chevron-right" scale="0.5" rotate="270" ></b-icon></b-button>
          </p>
          <p><b-icon icon="clock-history" scale="1.5"></b-icon></p>
    </b-col>
  </b-row>
</b-container>
 


   
  </section>

</template>

<script lang="js">



  import {db} from '../db.js';
  export default  {
    name: 'nota',
    props: ['nota'],
    mounted () {

    },
    data () {
      return {
        completado: false,
        prioridad: 2,
        datos: null
      }
    },
    methods: {
      cambioEstado: function() {
        this.nota.completado = !this.nota.completado;
        this.$emit("cambioEnEstado", this.nota);
      
      },

      borraTarea: function()
        {
          this.$emit("borraTarea", this.nota);
        },

        cambiaPrioridad: function(num) {
          this.nota.prioridad = num;
          this.$emit("cambioEnPrioridad", this.nota);
          
          
        }

    },
    computed: {
      calculaTiempo(){
        const DATE_UNITS = {
          day: 86400,
          hour: 3600,
          minute: 60,
          second: 1
        };

        const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000;
        const getUnitAndValueDate = (secondsElapsed) => {
          for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
            if (secondsElapsed >= secondsInUnit || unit === "second") {
              const value = Math.floor(secondsElapsed / secondsInUnit) * -1
              return { value, unit }
            }
          }
        };
        
        const getTimeAgo = timestamp => {
          const rtf = new Intl.RelativeTimeFormat()
        
          const secondsElapsed = getSecondsDiff(timestamp)
          const {value, unit} = getUnitAndValueDate(secondsElapsed)
          return rtf.format(value, unit)
        };

        if(!this.nota.fechaCreacion){
            return 0;
        }
        else{
            let creacion = new Date(this.nota.fechaCreacion);
            let ahora = new Date();
            let resta = ahora.getTime() - creacion.getTime();
            let tiempoPasado = ahora - resta;
            return ("Creada "+getTimeAgo(tiempoPasado));

        }
      }
    },

    firestore:
    {
      datos: db.collection('recordatorios')
    },

    filters: {
      capitalice: function(valor)
      {
        return (valor[0].toUpperCase()+valor.slice(1));
      }
    },
}


</script>

<style scoped >
  .nota {
    color: white;
    background-color: rgba(255, 255, 255, 0.247);
    border: 1px solid gray;
  }

  .mr-n2{
    background-color:  rgba(255, 255, 255, 0.247);
  }

  .check{
    background-color: rgba(255, 255, 255, 0.247);
  }

  .bv-example-row{
    text-align: left;
  }

  

  .completado{
    color: green;
    text-decoration:line-through;

  }

  .prioridad{
    font-size: 12px;
  }

  
  .icon{
    background-color: rgb(209, 60, 60);
  }

</style>
