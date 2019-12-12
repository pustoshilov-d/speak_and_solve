CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    id_vk integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    rating integer DEFAULT 0,
    speaking_with integer,
    tasks_sended integer DEFAULT 0,
    tasks_received integer DEFAULT 0,
    tasks_s_accepted integer DEFAULT 0,
    problem_category integer,
    problem_info character varying(255) COLLATE pg_catalog."default",
    tasks_r_accepted integer DEFAULT 0,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

