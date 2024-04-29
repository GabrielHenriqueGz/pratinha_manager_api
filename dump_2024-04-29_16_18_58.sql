--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE pratinha_manager;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:rHUhCA5V0zmFRYfDDbETaA==$Hmp4HebYpk6shFB3veqb4+NePi2OhJyiFXvoc+GX8RQ=:+vlWI1e9XSGhOLRyCCKuK2cCP8FPhThMJiVUQ+o8L1M=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "pratinha_manager" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pratinha_manager; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE pratinha_manager WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE pratinha_manager OWNER TO postgres;

\connect pratinha_manager

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "nickName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    released boolean DEFAULT true NOT NULL,
    "suspendedUntil" timestamp(3) without time zone
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "nickName", "createdAt", "updatedAt", released, "suspendedUntil") FROM stdin;
clr2j49js0002uksowoylq9fb	Eletrolux	2024-01-06 20:40:13.143	2024-03-16 15:31:34.315	t	\N
clsp8e7kz000090rq5ncbc2i2	Xu Xin	2024-02-16 22:38:25.763	2024-04-07 18:11:07.43	t	\N
clupuil9900009xg365iy8uy1	Vaca Sancta	2024-04-07 18:17:06.325	2024-04-07 18:17:06.325	t	\N
clr2j19510001uksojms1sij2	Kid vem bala	2024-01-06 20:37:52.644	2024-04-07 22:32:00.211	f	2024-04-21 22:32:00.211
clrc9ohkq00019hh5u7rf6ab1	Pika Pericles	2024-01-13 16:13:42.266	2024-04-21 16:11:46.533	t	\N
clr1801hv0001hibq3q9upas7	Beto lanches	2024-01-05 22:41:14.13	2024-04-21 16:11:46.533	t	\N
clr17wn800000hibqfemurx5a	cors main	2024-01-05 22:38:35.663	2024-04-21 16:15:16.933	f	2024-04-28 19:15:16.932
clrc9lojk00009hh5hvwu526b	Jhon Xina	2024-01-13 16:11:31.327	2024-04-21 18:27:39.977	f	2024-05-05 18:27:39.977
clr2iz5vs0000uksopu8tz0dh	Zero	2024-01-06 20:36:15.111	2024-02-18 17:51:29.261	t	\N
clr3tft770000yaoh068fglzw	Cors 2	2024-01-07 18:16:54.163	2024-04-21 18:56:11.423	f	2024-05-05 18:56:11.423
clrdq948e0000v50fdmmyjw5g	Lecao	2024-01-14 16:45:24.781	2024-04-21 19:38:04.726	f	2024-04-28 19:38:04.726
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1c80011a-a9d4-4c82-a1ad-860f092e41d1	276b351a81d111801ca3854aac637b37d8d1e110c1bf7d97b2f8a5beeaf8c28b	2023-11-26 19:09:38.518063+00	20231126190938_create_account	\N	\N	2023-11-26 19:09:38.509269+00	1
4bcbed68-9562-4b5d-af04-8cae248f31e2	b49eb841abfc9269232ad584d1e254756beaaaf8d69931caf12cb84862bdde59	2023-11-26 19:13:36.96214+00	20231126191336_add_teste	\N	\N	2023-11-26 19:13:36.957112+00	1
ece38dbf-0e39-40fa-bab3-d8c2d33c30e1	18b3cef1586ad57810e0293551438915a0807626fcee78706c735b6559df02a7	2023-11-26 19:14:13.741142+00	20231126191413_remove_teste	\N	\N	2023-11-26 19:14:13.736407+00	1
6773be72-dc0d-4e49-9877-b6b899d36e2e	c59714ae19fed0eb1f6d906e46e05c530b3807ef05f85940fb3f2dcc26bbb72d	2023-11-27 04:59:04.597114+00	20231127045904_add_released	\N	\N	2023-11-27 04:59:04.591788+00	1
04586742-d11b-45c7-ac1d-133d52900242	2eaf65ae671990059639c9ebd38d50668e65a85577a1b184c4c327d4530ce799	2023-11-27 22:18:20.62797+00	20231127221820_update_account	\N	\N	2023-11-27 22:18:20.620525+00	1
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

