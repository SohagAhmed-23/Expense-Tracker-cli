#!/usr/bin/env node
const { Command } = require('commander');
const { log } = require('console');
const fs = require('fs');
const { json } = require('stream/consumers');
const program = new Command();


const  addProduct = (description, price) => {

  if(!fs.existsSync('productFile.json')) {
     const product =[{
    'id' : 1,
    'description' : description,
    'amount' : price,
    'createdAt' : new Date().toISOString(),
    }];
    
    fs.writeFile('productFile.json', JSON.stringify(product,null,2), (err,data) => {
      if(err) {
        console.log('here is the err',err.message);
      } else {
        console.log(`Expense added successfully (ID: ${1})`);
      }
    });
    
  } else  {
     
  const data = JSON.parse(fs.readFileSync('productFile.json', 'utf8'));

  const newProduct ={
    'id' : data[data.length-1].id+1,
    'description' : description,
    'amount' : price,
    'createdAt' : new Date().toISOString(),
  };
  data.push(newProduct);

  fs.writeFile('productFile.json', JSON.stringify(data,null,2), (err,data) => {
      if(err) {
        console.log('here is the err',err.message);
      } else {
        console.log(`Expense added successfully (ID: ${newProduct.id})`);
      }
    });
    
  }

}

const updateProduct = (id, description,price) => {
  const data = JSON.parse(fs.readFileSync('productFile.json', 'utf8'));
  
  const update = data.map( (item) => {
     if( item.id == Number(id)) {
     item.description = description?description:item.description ;
     item.amount = price?price:item.amount;
     item.createdAt = new Date().toISOString();
    }
  });

 fs.writeFile('productFile.json', JSON.stringify(data,null,2), (err,data) => {
      if(err) {
        console.log('here is the err',err.message);
      } else {
        console.log(`product updated successfully`);
      }
    });
   }


const deleteProduct = (id) => {
 
  const data = JSON.parse(fs.readFileSync('productFile.json', 'utf-8'));

  
  const updatedData = data.filter(item => item.id !== Number(id));

 
  if (updatedData.length === data.length) {
    console.log("ID not found");
    return;
  }

  fs.writeFile('productFile.json', JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      console.log("Error writing file:", err.message);
    } else {
      console.log(`✅ Product deleted successfully (ID: ${id})`);
    }
  });
};


const summary = () => {
  const data =  JSON.parse(fs.readFileSync('productFile.json','utf-8'));
  let sum = 0;
   data.map(element => {

      sum+=Number(element.amount);
    });

  console.log(`Total expenses: $${sum}`)
}

program
  .command('add')
  .description('Add an expense')
  .option('-d, --description <desc>', 'Add description')
  .option('-p, --price <value>', 'Add price')
  .action((options) => {
    
    addProduct(options.description,options.price);
  });

  program
  .command('update')
  .description('update an expense')
  .option('-i, --id <desc>', 'Add description')
  .option('-d, --description <value>', 'Add description')
  .option('-p, --price <value>', 'Add price')
  .action((options) => {
    updateProduct( options.id, options.description,options.price);
  });
 program
  .command('delete')
  .description('delte an expense')
  .option('-i, --id <desc>', 'Add description')
  .action((options) => {
    deleteProduct( options.id);
  });

   program
  .command('summary')
  .description('summary an expense')
  .action((options) => {
    summary();
  });

    program
  .command('list')
  .description('list an expense')
  .action((options) => {
    summary();
  });


program.parse();
