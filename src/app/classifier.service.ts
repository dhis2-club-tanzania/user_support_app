import { sequence } from '@angular/animations';
import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { model, tensor } from '@tensorflow/tfjs';


@Injectable({
  providedIn: 'root'
})

export class ClassifierService {
  MAX_SEQUENCE_LENGTH = 113;


  constructor(){
  
  }
  
 word_preprocessor(word){
  word = word.replace(/[-|.|,|\?|\!]+/g, '');
  word = word.replace(/\d+/g, '1');
  word = word.toLowerCase();
  if (word != '') {
    return word;
  } else {
    return '.'
  }
};

 make_sequences(words_array) {
  let sequence = Array();
  words_array.slice(0, this.MAX_SEQUENCE_LENGTH).forEach(function(word) {
    word = this.word_preprocessor(word);
  
    // let id = words_vocab[word];
    // if (id == undefined) {
    //   sequence.push(words_vocab['<UNK>']);
    // } else {
    //   sequence.push(id);
    // }  
  });

  // pad sequence
  if (sequence.length < this.MAX_SEQUENCE_LENGTH) {
    let pad_array = Array(this.MAX_SEQUENCE_LENGTH - sequence.length);
    // pad_array.fill(words_vocab['<UNK>']);
    sequence = sequence.concat(pad_array);
  }

  return sequence;
};

  // model.predict(tf.tensor2d(sequence))
 

 predict(input){
   input = this.word_preprocessor(input);
   let word = this.make_sequences(input);   
 }






 

}




