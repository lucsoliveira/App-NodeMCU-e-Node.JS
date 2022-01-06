/* Painel NodeMCU: codeMicro - v0.1.
 * Código fonte para NodeMCU para gerenciamento de sensores
 * Desenvolvido por Lucas Oliveira para o Portal Engtecs.com.br
*/

// bibliotecas
#include <WiFiManager.h> // Fork da biblioteca original https://github.com/lucsoliveira/WifiManager-PT-BR-ESP8266-
#include <Arduino_JSON.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <DNSServer.h>

// constantes
WiFiManager wm;
String host_servidor = "http://192.168.0.136:3000"; // IP da máquina que hospeda o servidor Node.JS
float intevalo_atualizacao = 3;                     // em segundos

void setup()
{

    /* Inicia configurando a WiFi do NodeMCU */
    WiFi.mode(WIFI_STA); // definir explicitamente o modo, o padrão esp é STA + AP

    // coloque seu código de configuração aqui, para ser executado uma vez:
    Serial.begin(115200);

    //redefinir configurações - limpe as credenciais para teste
    //wm.resetSettings();

    bool res;
    // res = wm.autoConnect(); // nome do AP gerado automaticamente a partir do chipid
    // res = wm.autoConnect("AutoConnectAP"); //ap anônimo
    res = wm.autoConnect("AutoConnectAPESP", "senha123");

    if (!res)
    {
        Serial.println("Falhou ao conectar");
        // ESP.restart();
    }
    else
    {
        //if you get here you have connected to the WiFi
        Serial.println("conectado!");
    }
}

void loop()
{

    while (WiFi.status() == WL_CONNECTED)
    {
        // coloque seu código principal aqui, para executar repetidamente:

        postValorSensor("TEMP1", random(10, 30));
        postValorSensor("TEMP2", random(0, 30));

        delay(intevalo_atualizacao * 1000);
    }
}

void postValorSensor(String uid_sensor, float valor)
{

    //Check WiFi connection status

    HTTPClient http;

    WiFiClient client;

    http.begin(client, host_servidor + "/api/coleta/add");

    // Specify content-type header
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    // Data to send with HTTP POST
    String httpRequestData = "uid=" + uid_sensor + "&valor=" + valor;
    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    // Free resources
    http.end();

    return;
}
