from flask import Flask, render_template, url_for, request, redirect, send_file, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
db = SQLAlchemy(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Projects')
def projects():
    return render_template('projects.html')


if __name__ == "__main__":
    print(os.getcwd())
    app.run(debug=True)

    d3.csv(data)
    .then(data => {
        data.forEach( d => {
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.acceleration = +d.acceleration;
            d.year = +d.year;})
        render(data);
    })