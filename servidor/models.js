module.exports = function (sequelize, Model, DataTypes) {

    var primeiraUtilizacao = false;

    // Sensor
    class Sensor extends Model { }

    Sensor.init({
        uid: DataTypes.STRING,
        desc: DataTypes.STRING,
        unidade: DataTypes.STRING,
    }, { sequelize, modelName: 'sensor' });

    // Coleta
    class Coleta extends Model { }

    Coleta.init({
        id_sensor: DataTypes.INTEGER,
        valor: DataTypes.FLOAT
    }, { sequelize, modelName: 'coleta' });

    // sincronização na primeira inicialização
    (async () => {
        await sequelize.sync();

        console.log('Criando as tabelas no banco de dados...')
        console.log('Preenchendo tabelas.')

        // após criar as tabelas insere-se em cada uma um valor inicial

        if (primeiraUtilizacao) {

            await Sensor.create({ uid: 'TEMP1', desc: 'Sensor de Temperatura', unidade: '°C' });
            await Coleta.create({ id_sensor: 1, valor: 34.3 });
        }


        console.log('Banco de dados iniciado com sucesso.')

    })();

    // declarando models como variavel global para serem reutilizados
    // em todo o sistema

    global.Sensor = Sensor
    global.Coleta = Coleta

}