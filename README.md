# Ravn
## _Proyecto_
### Giacomo Daneri Tuesta

## Part 1
1. Who are the first 10 authors ordered by date_of_birth?
```
select *
from authors
order by date_of_birth
limit 10
```
2. What is the sales total for the author named “Lorelai Gilmore”?
```
select *
from sale_items
inner join books on sale_items.book_id = books.id
inner join authors on books.author_id = authors.id
where authors.name = 'aa'
```
3. What are the top 10 performing authors, ranked by sales revenue?	
```
select SUM(sale_items.quantity*sale_items.item_price) as Monto, authors.name
from sale_items
inner join books on sale_items.book_id = books.id
inner join authors on books.author_id = authors.id
group by authors.name
order by Monto
limit 10
```


## Part 4
In order to realize the deploy on Dockers, first of all is necesary to create a Dockerfile inside the main directory of the project.
![image](https://user-images.githubusercontent.com/30025188/139563417-d3ac38f1-c3de-4fa8-857b-c500950d92ab.png)
On this file, we should code few simple lines,
- Line 1: FROM will choose the architecture and version the project uses
- Line 2: ENV will set the type of enviroment the project uses
- Line 4: WORKDIR sets the direction where the new image will be located
- Line 6: COPY will copy elements that we choose, in this case -> ["package.json", "package-lock.json*", "./"]
- Line 8: RUN runs a command, this case it will install the package.json as production mode
- Line 10: COPY, will copy the rest of elements of the project
- Line 12: CMD execute the NodeJS server
After that, we should run a docker command on the terminar to create the image
> docker build -t ravn:sabado ./

This line will create the image file on dockers, and it will be ready to be used
