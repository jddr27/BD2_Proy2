'use strict';
const express = require('express');
const fs = require('fs');
const cassandra = require('cassandra-driver'); 
/*const client = new cassandra.Client({contactPoints:['bd2_DC1N1_1:9042','bd2_DC1N2_1:9043','bd2_DC1N3_1:9044'], keyspace:'proyecto'});
client.connect((err, result) => {
    if(err){
        console.log(err);
    } else {
        console.log('index: cassandra connected');
    }
    
});*/

const app = express();
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json()); 
app.use('/static', express.static(__dirname + '/public'));

var salida = "";
var arreglo = [];

app.get('/',function(req, res){
    res.render('main',{consola:salida, valores:arreglo});
});

app.get('/nPais',function(req, res){
    let paises = []
    let query = "SELECT * FROM pais_por_a3c;";
    client.execute(query,[], (err, result) => {
        if(err){
            salida = err;
            console.log("ERROR" + err);
        } else {
            paises = result.rows;
            console.log(result.rows);
            salida = "Correcta";
        }
    });
    res.render('nPais',{consola:salida, valores:paises});
});

app.get('/nPate',function(req, res){
    res.render('nPate',{consola:salida, valores:arreglo});
});

app.get('/nCola',function(req, res){
    res.render('nCola',{consola:salida, valores:arreglo});
});

app.get('/lInve',function(req, res){
    res.render('lInve',{consola:salida, valores:arreglo});
});

app.get('/lPais',function(req, res){
    res.render('lPais',{consola:salida, valores:arreglo});
});

app.get('/lArea',function(req, res){
    res.render('lArea',{consola:salida, valores:arreglo});
});

app.get('/cargarPais',function(req, res){
    let rawdata = fs.readFileSync('./data/countries.json');
    let exjson = JSON.parse(rawdata);
    let query = "";
    exjson.forEach(function(element) {
        //console.log("nombre: " + element.name + ", a2c: " + element.alpha2Code  + ", a3c: " + element.alpha3Code + ", fronte: {\"" + element.borders.join('","').toString() + "\"}");
        query = "INSERT INTO pais (nombrePais, a2c, a3c, borders)" +  
                        "VALUES ('"+ element.name +"', '"+ element.alpha2Code +"', '"+
                        element.alpha3Code+ "', {'" + element.borders.join("','").toString() + "'});";
        //console.log(query);
        client.execute(query,[], (err, result) => {
            if(err){
                console.log("ERROR" + err);
            }
        });
        query = "INSERT INTO pais_por_a2c (nombrePais, a2c)" +  
                        "VALUES ('"+ element.name +"', '"+ element.alpha2Code +"');";
        client.execute(query,[], (err, result) => {
            if(err){
                console.log("ERROR" + err);
            }
        });
        query = "INSERT INTO pais_por_a3c (nombrePais, a3c)" +  
                        "VALUES ('"+ element.name +"', '"+ element.alpha3Code +"');";
        client.execute(query,[], (err, result) => {
            if(err){
                console.log("ERROR" + err);
            }
        });
    });
    //console.log(student);
    res.redirect('/');
});

app.post('/nuevoPais', (req, res) => {
    console.log('entro a crear');
    console.log(req.body);
    let query = "";
    query = "INSERT INTO pais (nombrePais, a2c, a3c, borders)" +  
                "VALUES ('"+ req.body.name +"', '"+ req.body.a2c +"', '"+
                req.body.a3c+ "', {'" + req.body.borders.join("','").toString() + "'});";
    console.log(query);
    /*client.execute(query,[], (err, result) => {
        if(err){
            console.log("ERROR" + err);
        }
    });
    query = "INSERT INTO pais_por_a2c (nombrePais, a2c)" +  
                    "VALUES ('"+ exjson.name +"', '"+ exjson.a2c +"');";
    client.execute(query,[], (err, result) => {
        if(err){
            console.log("ERROR" + err);
        }
    });
    query = "INSERT INTO pais_por_a3c (nombrePais, a3c)" +  
                    "VALUES ('"+ exjson.name +"', '"+ exjson.a3c +"');";
    client.execute(query,[], (err, result) => {
        if(err){
            console.log("ERROR" + err);
        }
    });*/
    res.redirect('/nPais');
});

app.post('/filtrar', (req, res) => {
    console.log('entro a filtrar');
    console.log(req.body)
    salida = "";
    if(req.body.fEmail == "" && req.body.fIni != "" && req.body.fFin != "" ){
        console.log("correo vacio");
        var query = "SELECT * FROM tickets WHERE fecha > '" + req.body.fIni + "' AND fecha < '" + req.body.fFin + "' ALLOW FILTERING;";
        console.log(query);
        client.execute(query,[], (err, result) => {
            if(err){
                salida = err;
                console.log("ERROR" + err);
            } else {
                arreglo = result.rows;
                console.log(result.rows);
                salida = "Correcta";
            }
        });
    }
    else if(req.body.fEmail != "" && req.body.fIni != "" && req.body.fFin != "" ){
        console.log("nada vacio");
        var query = "SELECT * FROM tickets WHERE fecha > '" + req.body.fIni + "' AND fecha < '" + req.body.fFin + "' AND email = '" + req.body.fEmail + "' ALLOW FILTERING;";
        console.log(query);
        client.execute(query,[], (err, result) => {
            if(err){
                salida = err;
                console.log("ERROR" + err);
            } else {
                arreglo = result.rows;
                console.log(result.rows);
                salida = "Correcta";
            }
        });
    }
    else if(req.body.fEmail != "" && req.body.fIni == "" && req.body.fFin != "" ){
        console.log("inicio vacio");
        var query = "SELECT * FROM tickets WHERE fecha < '" + req.body.fFin + "' AND email = '" + req.body.fEmail + "' ALLOW FILTERING;";
        console.log(query);
        client.execute(query,[], (err, result) => {
            if(err){
                salida = err;
                console.log("ERROR" + err);
            } else {
                arreglo = result.rows;
                console.log(result.rows);
                salida = "Correcta";
            }
        });
    }
    else if(req.body.fEmail != "" && req.body.fIni == "" && req.body.fFin != "" ){
        console.log("fin vacio");
        var query = "SELECT * FROM tickets WHERE fecha > '" + req.body.fIni + "' AND email = '" + req.body.fEmail + "' ALLOW FILTERING;";
        console.log(query);
        client.execute(query,[], (err, result) => {
            if(err){
                salida = err;
                console.log("ERROR" + err);
            } else {
                arreglo = result.rows;
                console.log(result.rows);
                salida = "Correcta";
            }
        });
    }
    else{
        console.log("todo");
        var query = "SELECT * FROM tickets;";
        console.log(query);
        client.execute(query,[], (err, result) => {
            if(err){
                salida = err;
                console.log("ERROR" + err);
            } else {
                arreglo = result.rows;
                console.log(result.rows);
                salida = "Correcta";
            }
        });
    }
    res.redirect('/');
});
  

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
  });