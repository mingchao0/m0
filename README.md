# M0: Setup & Centralized Computing

> Full name: `Mingchao Zhang`
> Email: `mingchao_zhang@brown.edu`
> Username: `mzhan203`

## Summary

> Summarize your implementation, including key challenges you encountered

My implementation comprises `8` software components, totaling `254` lines of code in the following languages: `81` lines of shell scripts and `173` of JavaScript code. Key challenges included:

1. Need to guess the requirements with limited guidance. The functionality description of each file has only one sentence or two. Not sure what the requirements are, I inspected the test files and what the expected outputs are for every one of them. I also reviewed the architecture diagram each time after finishing a component to make sure I could connect different pieces together.
2. Unfamiliarity with shell scripts. The bash scripts were very challenging to me. Not only because I had not learned script coding before, but also shell scripts were very hard to read, and the syntax was not intuitve. To overcome this, I broken down a task into many smaller pieces, each with a comment. Then I used various resources online to work on one piece at a time.
3. The debugging process is hard, because there are too many components in the system.

## Correctness & Performance Characterization

> Describe how you characterized the correctness and performance of your implementation

_Correctness_: My implementation passes `<number>` out of the `<number>` tests (`<percentage>`%) already provided for M0. I developed another `<number>` tests, which focus on `<..details>`. All these tests, combined take `<time>` to complete. `<additional approaches for increasing correctness confidence>`.

_Performance_: Evaluating the entire system using the `time` command on the three sandboxes reports the following times:

|           | Engine   | Query    |
| --------- | -------- | -------- |
| Sandbox 1 | 8.633s   | 0.023s   |
| Sandbox 2 | 5m8.178s | 0.182s   |
| Sandbox 3 | `<time>` | `<time>` |

## Time to Complete

> Roughly, how many hours did this milestone take you to complete?

Hours: `20+`

## Wild Guess

> How many lines of code do you think it will take to build the fully distributed, scalable version of your search engine? (If at all possible, try to justify your answer — even a rough justification about the order of magnitude is enough)

DLoC: `10000`
The IP-TCP project I wrote for Computer Networks has around 3000 lines of code. I expect there to be more serialization, deserialization and error checks in the parser, so 10000 is my guess of the upper limit.
