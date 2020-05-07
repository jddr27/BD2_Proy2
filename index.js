'use strict';
const express = require('express');
const fs = require('fs');
const cassandra = require('cassandra-driver'); 
const client = new cassandra.Client({contactPoints:['bd2_DC1N1_1:9042','bd2_DC1N2_1:9043','bd2_DC1N3_1:9044'], keyspace:'proyecto'});
client.connect((err, result) => {
    if(err){
        console.log(err);
    } else {
        console.log('index: cassandra connected');
    }
    
});

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
            return res.send(err.toString());
        } else {
            paises = result.rows;
            //console.log(result.rows);
            return res.render('nPais',{valores:paises});
        }
    });
});

app.get('/nPate',function(req, res){
    res.render('nPate',{consola:salida, valores:arreglo});
});

app.get('/nCola',function(req, res){
    let areas = []
    let query = "SELECT idArea, nombreArea FROM area;";
    client.execute(query,[], (err, result) => {
        if(err){
            salida = err;
            console.log("ERROR" + err);
            return res.send(err.toString());
        } else {
            areas = result.rows;
            //console.log(result.rows);
            return res.render('nCola',{valores:areas});
        }
    });
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
        query = "INSERT INTO pais (nombrePais, a2c, a3c, borders) " +  
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
    res.redirect('/');
});

app.post('/nuevoPais', (req, res) => {
    console.log('entro a crear un pais');
    //console.log(req.body);
    let query = "";
    query = "INSERT INTO pais (nombrePais, a2c, a3c, borders) " +  
                "VALUES ('"+ req.body.name +"', '"+ req.body.a2c +"', '"+
                req.body.a3c+ "', {'" + req.body.borders.join("','").toString() + "'});";
    console.log(query);
    client.execute(query,[], (err, result) => {
        if(err){
            console.log("ERROR" + err);
        }
    });
    query = "INSERT INTO pais_por_a2c (nombrePais, a2c)" +  
                    "VALUES ('"+ req.body.name +"', '"+ req.body.a2c +"');";
    client.execute(query,[], (err, result) => {
        if(err){
            console.log("ERROR" + err);
        }
    });
    query = "INSERT INTO pais_por_a3c (nombrePais, a3c)" +  
                    "VALUES ('"+ req.body.name +"', '"+ req.body.a3c +"');";
    client.execute(query,[], (err, result) => {
        if(err){
            console.log("ERROR" + err);
        }
    });
    console.log('termino de crear el pais');
    res.redirect('/nPais');
});

app.get('/cargarCola',function(req, res){
    let rawdata = fs.readFileSync('./data/patents.json');
    let exjson = JSON.parse(rawdata);
    let query = "";
    let anio = 2020;
    let areas = "";
    exjson.patents.forEach(function(personas) {
        personas.IPCs.forEach(function(area) {
            areas += area.ipc_section.toString() + "', '";
        });
        areas = areas.substring(0,areas.length-3);
        personas.examiners.forEach(function(element) {
            anio = Math.floor(Math.random() * (2019 - 2010)) + 2010;
            query = "INSERT INTO profesional (idProfesional, nombreProfesional, apellidoProfesional, fechaInicio, areas) " +  
                            "VALUES ('"+ element.examiner_id +"', '"+ element.examiner_first_name +"', '"+
                            element.examiner_last_name + "', '" + anio + "-01-01', {'"+ areas +"});";
            //console.log(query);
            /*client.execute(query,[], (err, result) => {
                if(err){
                    console.log("ERROR" + err);
                }
            });*/
            personas.IPCs.forEach(function(area) {
                query = "INSERT INTO profesional_por_area (idProfesional, nombreProfesional, idArea) " +  
                            "VALUES ('"+ element.examiner_id +"', '"+ element.examiner_first_name +" "+ 
                            element.examiner_last_name + "', '"+ area.ipc_section.toString() +"');";
                //console.log(query);
                client.execute(query,[], (err, result) => {
                    if(err){
                        console.log("ERROR" + err);
                    }
                });
            });
        });
        areas = "";
    });
    res.redirect('/');
});

app.post('/nuevoCola', (req, res) => {
    console.log('entro a crear un colaborador');
    let query = "";
    let id = makeid(25);
    query = "INSERT INTO profesional (idProfesional, nombreProfesional, apellidoProfesional, fechaInicio, areas) " +  
                "VALUES ('"+ id +"', '"+ req.body.name +"', '"+ req.body.ape+ "', '" 
                + req.body.fecha +"', {'" + req.body.areas.join("','").toString() + "'});";
    //console.log(query);
    client.execute(query,[], (err, result) => {
        if(err){
            console.log("ERROR" + err);
        }
    });
    req.body.areas.forEach(function(area) {
        query = "INSERT INTO profesional_por_area (idProfesional, nombreProfesional, idArea) " +  
                    "VALUES ('"+ id +"', '"+ req.body.name +" "+ req.body.ape+ "', '"+ area +"');";
        //console.log(query);
        client.execute(query,[], (err, result) => {
            if(err){
                console.log("ERROR" + err);
            }
        });
    });
    console.log('termino de crear el colaborador');
    res.redirect('/nCola');
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
  });