export default function Unauthorized() {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Acesso negado</h1>
            <p>Esta página é restrita apenas para <strong>funcionários</strong>.</p>
        </div>
    );
}