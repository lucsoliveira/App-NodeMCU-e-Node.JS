module.exports = function (app) {

    /* ROTAS PARA O SITE */
    // site - index
    app.get('/', (req, res) => {
        res.render('index', { page: 'index', msg: null });
    })

    // pagina de acesso ao sensor
    app.get('/sensor/visualizar', (req, res) => {

        let uid_sensor = req.query.uid;

        if (!uid_sensor || uid_sensor == '') {

            res.render('index', { page: 'index', data: null, msg: null });

        } else {

            Sensor.findOne({ where: { uid: uid_sensor } }).then((sensor) => {


                if (sensor == null) {

                    // não foi encontrado nenhum sensor com esse uid
                    // logo, retorna null e error

                    res.render('index', { page: 'index', data: null, error: true, msg: "Não encontramos este sensor." });

                } else {

                    // passando o sensor para renderização
                    let data = {

                        sensor: sensor
                    }
                    res.render('index', { page: 'sensor', data: data, error: false });

                }

            });



        }



    })

    // post - sensor - add
    app.post('/sensor/add', (req, res) => {

        let uid_b = req.body.uid;
        let desc_b = req.body.desc
        let unidade_b = req.body.unidade

        if (uid_b && desc_b && unidade_b) {

            // verifica se ja há um sensor com essa UID, caso haja, não é criado
            Sensor.findOne({ where: { uid: uid_b } }).then((sensor) => {


                if (sensor == null) {

                    // não foi encontrado nenhum sensor com esse uid
                    // logo, insere um novo sensor com essa uid no banco de dados

                    Sensor.create({
                        uid: uid_b,
                        desc: desc_b,
                        unidade: unidade_b
                    });

                    res.render('index', { page: 'index', error: false, msg: "Sensor adicionado com sucesso!" });


                } else {

                    res.render('index', { page: 'index', error: true, msg: 'Ja há um sensor com essa UID.' });

                }

            });



        } else {

            res.render('index', { page: 'index', error: true, msg: "Não foi possível adicionar o sensor. Tente novamente." });
        }


    });

    // get - sensor - deletar
    app.get('/sensor/deletar', (req, res) => {


        let uid_q = req.query.uid;


        if (uid_q) {

            // verifica se ja há um sensor com essa UID, caso haja, não é criado
            Sensor.findOne({ where: { uid: uid_q } }).then((sensor) => {


                if (sensor == null) {

                    // não foi encontrado nenhum sensor com esse uid
                    // logo, retorna null e error

                    res.render('index', { page: 'index', error: true, msg: "Sensor não encontrado." });


                } else {

                    sensor.destroy()

                    res.render('index', { page: 'index', error: false, msg: "Sensor deletado com sucesso." });

                }

            });



        } else {

            res.render('index', { page: 'index', error: true, msg: "Não foi possivel deletar o sensor. Tente novamente." });

        }


    });

    /* ROTAS PARA A API */
    require('./routes/sensor.js')(app)
    require('./routes/coleta.js')(app)


}