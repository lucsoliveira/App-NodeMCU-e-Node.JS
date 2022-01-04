module.exports = function (app) {

    //api - sensor - add
    app.post('/api/sensor/add', (req, res) => {

        let uid_b = req.body.uid;
        let desc_b = req.body.desc
        let unidade_b = req.body.unidade

        res.setHeader('Content-Type', 'application/json');

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

                    res.end(JSON.stringify({ data: null, error: false, msg: "Sensor adicionado com sucesso!" }));


                } else {

                    res.end(JSON.stringify({ data: null, error: true, msg: 'Ja há um sensor com essa UID.' }));

                }

            });



        } else {

            res.end(JSON.stringify({ data: null, error: true }));

        }

    })

    // api - sensor - get
    app.get('/api/sensor/get', (req, res) => {

        let uid_sensor_q = req.query.uid

        res.setHeader('Content-Type', 'application/json');

        if (uid_sensor_q) {

            Sensor.findOne({ where: { uid: uid_sensor_q } }).then((sensor) => {

                // não foi encontrado nenhum sensor com esse uid
                if (sensor == '') {

                    res.end(JSON.stringify({ data: null, error: true }));

                } else {

                    res.end(JSON.stringify({ data: { sensor: sensor }, error: false }));
                }

            });

        } else {

            // não foi passado nenhuma query, logo retornará erro
            res.end(JSON.stringify({ data: null, error: true }));
        }

    })

    // api - sensor - update
    app.post('/api/sensor/update', (req, res) => {

        let uid_b = req.body.uid;
        let desc_b = req.body.desc
        let unidade_b = req.body.unidade

        res.setHeader('Content-Type', 'application/json');

        if (uid_b && desc_b && unidade_b) {

            // verifica se ja há um sensor com essa UID, caso haja, não é criado
            Sensor.findOne({ where: { uid: uid_b } }).then((sensor) => {


                if (sensor == null) {

                    // não foi encontrado nenhum sensor com esse uid
                    // logo, retorna null e error

                    res.end(JSON.stringify({ data: null, error: true, msg: "Sensor não encontrado." }));


                } else {

                    sensor.set({
                        uid: uid_b,
                        desc: desc_b,
                        unidade: unidade_b
                    });
                    sensor.save();

                    res.end(JSON.stringify({ data: null, error: false, msg: "Sensor atualizado com sucesso." }));

                }

            });



        } else {

            res.end(JSON.stringify({ data: null, error: true }));

        }

    })

    // api - sensor - delete
    app.get('/api/sensor/delete', (req, res) => {

        let uid_q = req.query.uid;

        res.setHeader('Content-Type', 'application/json');

        if (uid_q) {

            // verifica se ja há um sensor com essa UID, caso haja, não é criado
            Sensor.findOne({ where: { uid: uid_q } }).then((sensor) => {


                if (sensor == null) {

                    // não foi encontrado nenhum sensor com esse uid
                    // logo, retorna null e error

                    res.end(JSON.stringify({ data: null, error: true, msg: "Sensor não encontrado." }));


                } else {

                    sensor.destroy()
                    res.end(JSON.stringify({ data: null, error: false, msg: "Sensor deletado com sucesso." }));

                }

            });



        } else {

            res.end(JSON.stringify({ data: null, error: true }));

        }

    })

    // api - sensor - get - all
    app.get('/api/sensor/get/all', (req, res) => {


        res.setHeader('Content-Type', 'application/json');

        Sensor.findAll().then((sensores) => {

            // não foram encontrados sensores
            if (sensores == '') {

                res.end(JSON.stringify({ data: null, error: true, msg: "Não foram encontrados sensores." }));

            } else {

                res.end(JSON.stringify({ data: { sensores: sensores }, error: false }));
            }

        });

    })

}