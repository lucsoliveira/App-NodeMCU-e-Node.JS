module.exports = function (app) {

    // api - coleta - add
    app.post('/api/coleta/add', (req, res) => {

        let uid_sensor_q = req.body.uid;
        let valor_q = req.body.valor

        console.log('uid_sensor_q: ', uid_sensor_q)
        console.log('valor_q: ', valor_q)

        res.setHeader('Content-Type', 'application/json');

        if (uid_sensor_q) {

            // verifica se há sensor com essa UID cadastrada no banco de dados
            Sensor.findOne({ where: { uid: uid_sensor_q } }).then((sensor) => {

                // não foi encontrado nenhum sensor com esse uid
                if (sensor == null) {

                    res.end(JSON.stringify({ data: null, error: true }));


                } else {

                    // encontrou um sensor com esse UID, agora grava no banco de dados
                    // o valor da coleta do sensor         
                    Coleta.create({
                        id_sensor: sensor.id,
                        valor: valor_q
                    });

                    res.end(JSON.stringify({ data: null, error: false, msg: "Coleta adicionada com sucesso!" }));
                }

            });



        } else {

            res.end(JSON.stringify({ data: null, error: true }));

        }

    })

    // api - coleta - get - all
    app.get('/api/coleta/get/all', (req, res) => {

        let id_sensor_q = req.query.idSensor
        let uid_sensor_q = req.query.uid
        let limite = req.query.limite

        res.setHeader('Content-Type', 'application/json');

        if (id_sensor_q) {

            // as coletas ja são ordenadas em ordem decrescente automaticamente
            Coleta.findAll({ where: { id_sensor: id_sensor_q }, limit: limite, order: [['id', 'DESC']] }).then((coletas) => {

                // não foi encontrado nenhuma coleta com esse id do sensor
                if (coletas == '') {

                    res.end(JSON.stringify({ data: null, error: true }));

                } else {

                    res.end(JSON.stringify({ data: { coletas: coletas }, error: false }));
                }

            });

        } else {

            //verifica se o argumento passado foi o UID
            if (uid_sensor_q) {

                Sensor.findOne({ where: { uid: uid_sensor_q } }).then((sensor) => {

                    // não foi encontrado nenhum sensor com esse uid
                    if (sensor == null) {

                        res.end(JSON.stringify({ data: null, error: true, msg: 'Não foram encontrados valores' }));

                    } else {

                        // obtem o ID do sensor e suas coletas
                        Coleta.findAll({ where: { id_sensor: sensor.id }, limit: limite, order: [['id', 'DESC']] }).then((coletas) => {

                            // não foi encontrado nenhuma coleta com esse id do sensor
                            if (coletas == '') {

                                res.end(JSON.stringify({ data: null, error: true }));

                            } else {

                                res.end(JSON.stringify({ data: { coletas: coletas }, error: false }));
                            }

                        });

                    }

                });



            } else {

                // não foi passado nenhuma query, logo retornará erro
                res.end(JSON.stringify({ data: null, error: true }));

            }



        }

    })

    // api - coleta - get - last
    app.get('/api/coleta/get/last', (req, res) => {

        let id_sensor_q = req.query.idSensor
        let uid_sensor_q = req.query.uid

        res.setHeader('Content-Type', 'application/json');

        if (id_sensor_q) {

            // as coletas ja são ordenadas em ordem decrescente automaticamente
            Coleta.findOne({ where: { id_sensor: id_sensor_q }, order: [['id', 'DESC']] }).then((coleta) => {

                // não foi encontrado nenhuma coleta com esse id do sensor
                if (coleta == '') {

                    res.end(JSON.stringify({ data: null, error: true }));

                } else {

                    res.end(JSON.stringify({ data: { coleta: coleta }, error: false }));
                }

            });

        } else {

            //verifica se o argumento passado foi o UID
            if (uid_sensor_q) {

                Sensor.findOne({ where: { uid: uid_sensor_q } }).then((sensor) => {

                    // não foi encontrado nenhum sensor com esse uid
                    if (sensor == null) {

                        res.end(JSON.stringify({ data: null, error: true, msg: 'Não foram encontrados valores' }));

                    } else {

                        // obtem o ID do sensor e sua coleta
                        Coleta.findOne({ where: { id_sensor: sensor.id }, order: [['id', 'DESC']] }).then((coleta) => {

                            // não foi encontrado nenhuma coleta com esse id do sensor
                            if (coleta == '') {

                                res.end(JSON.stringify({ data: null, error: true }));

                            } else {

                                res.end(JSON.stringify({ data: { coleta: coleta }, error: false }));
                            }

                        });

                    }

                });



            } else {

                // não foi passado nenhuma query, logo retornará erro
                res.end(JSON.stringify({ data: null, error: true }));

            }



        }

    })

}