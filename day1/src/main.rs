/// A Rust implementation of a soluation for Day 1 of Advent of Code 2020.
/// https://adventofcode.com/2020/day/1
use std::error::Error;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::result::Result;

const TARGET: u32 = 2020;

fn main() -> Result<(), Box<dyn Error>> {
    let path = "input.txt";
    // Read the contents of the input file here
    match get_input(path) {
        Ok(input) => {
            
            // First part, where two are the solution
            'outer: for i1 in 0..input.len() {
                for i2 in 0..input.len() {
                    if input[i1] + input[i2] == TARGET && i1 != i2 {
                        println!("Found i1={} and i2={}. ", i1, i2);
                        println!("Result for sum of two: {}", input[i1] * input[i2]);
                        break 'outer;
                    }
                }
            }

            // Second part, where three are the solution. 
            'outer: for i1 in 0..input.len() {
                for i2 in 0..input.len() {
                    for i3 in 0..input.len() {
                        if input[i1] + input[i2] + input[i3] == TARGET && i1 != i2 && i2 != i3 {
                            println!("Found i1={}, i2={} and i3={}. ", i1, i2, i3);
                            println!("Result for sum of three: {}", input[i1] * input[i2] * input[i3]);
                            break 'outer;
                        }
                    }
                }
            }

            Ok(())
        }
        Err(e) => Err(Box::new(e)),
    }
}

/// Gets the input list of numbers from a file.
pub fn get_input(filepath: &str) -> Result<Vec<u32>, std::io::Error> {
    let file = File::open(filepath)?;
    let reader = BufReader::new(file);
    reader
        .lines()
        .map(|txt| {
            txt.and_then(|txt| {
                txt.parse()
                    .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))
            })
        })
        .collect()
}
