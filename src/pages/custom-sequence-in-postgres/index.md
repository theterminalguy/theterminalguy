---
title: Custom Sequence In Postgres
date: "2017-02-26T22:12:03.284Z"
---

I almost got frustrated this weekend after trying to mass update a column in Postgres with sequential numbers for each row. The table **(basic_matrices)** has over ten thousand rows and I just generated a migration that adds a **position column** to the table which defaults to zero (0).


The goal is to have this column populated with sequential numbers ranging from **1, 2, 3,… to the number of rows in the table.**

Here is how I solved that problem:

```
CREATE SEQUENCE basic_matrices_position_seq
ALTER SEQUENCE basic_matrices_position_seq RESTART WITH 1

UPDATE basic_matrices bm
SET position = nextval(‘basic_matrices_position_seq’)
FROM (SELECT id FROM basic_matrices ORDER BY id) sub
WHERE bm.id = sub.id

DROP SEQUENCE basic_matrices_position_seq
```

**First**, I created a named sequence in postgres.

**Next**, I reset the sequence to start counting from 1.

**After**, which I updated the each row position by using the nextval() postgres function which takes in a sequence name as argument.

**Finally**, I dropped the sequence because I want to be in charge of updating the position column and not postgres.

>If you are wondering why I needed the subquery, that is because I wanted to update the position column based on the result set of the sub query.

Hope this helps someone. Thanks for stopping by.
